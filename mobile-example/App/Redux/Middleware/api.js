/* eslint no-unexpected-multiline: 0 */

import { InteractionManager } from 'react-native'
import { Subject } from 'rxjs/Subject'

import qs from 'qs'
import request from 'superagent'
import normalize from 'json-api-normalizer'

import assign from 'lodash/assign'
import get from 'lodash/get'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import isEmpty from 'lodash/isEmpty'

import { api } from 'Config/Services'

import { getJWTHeader } from 'Redux/Selectors/viewer'

import { API_CALL } from './ids'

const sendMethod = HTTPMethod =>
  HTTPMethod === 'post' || HTTPMethod === 'put' || HTTPMethod === 'patch'
    ? 'send'
    : 'query'

const sendArguments = (HTTPMethod, query) =>
  HTTPMethod === 'post' || HTTPMethod === 'put' || HTTPMethod === 'patch'
    ? JSON.stringify(query)
    : qs.stringify(query, { arrayFormat: 'brackets' })

const apiCall = (
  url = api.url,
  endpoint = '',
  method = 'GET',
  query = {},
  headers = {}
) => {
  const subject = new Subject()
  const HTTPMethod = method.toLowerCase()

  request
    [HTTPMethod](url + endpoint)
    [sendMethod(HTTPMethod)](sendArguments(HTTPMethod, query))
    .set(headers)
    .end((error, data) => {
      if (isEmpty(data) || data.body === null) {
        merge(data, { body: { data: [] } })
      }

      if (error) {
        subject.error({ data, error })
      } else {
        subject.next(data)
        subject.complete()
      }
    })

  return subject
}

const nextAction = (action, data) => {
  const next = merge({}, action, data)
  delete next[API_CALL]
  return next
}

export default store => next => action => {
  if (action.type !== API_CALL || !action.fields) return next(action)

  const { url, endpoint, headers, method, query, response, types } = action.fields

  const signature = Date.now()
  const JWTHeader = getJWTHeader(store.getState())

  const completeHeaders = assign(
    { 'Content-Type': 'application/vnd.api+json' },
    JWTHeader && (!url || url === api.url)
      ? { Authorization: JWTHeader }
      : {},
    headers
  )

  const fsaFields = pick(action.fields, 'payload', 'error', 'meta')
  const isLoadRequest = !method || method.toUpperCase() === 'GET'

  next(
    nextAction(fsaFields, {
      type: types.REQUEST,
      meta: merge({ signature }, isLoadRequest && { endpoint, isRequest: true })
    })
  )

  const subject = new Subject()
  const apiRequest = apiCall(url, endpoint, method, query, completeHeaders)

  const onError = rawData => {
    const payload = get(rawData, 'data.body') || {}

    const data = {
      payload,
      type: types.FAILURE,
      meta: {
        query,
        signature,
        httpCode: rawData.error.status,
        isNetworkFailure: !rawData.error.status
      },
      error: true
    }

    next(nextAction(fsaFields, data))

    subject.error({
      httpCode: rawData.error.status,
      isNetworkFailure: !rawData.error.status,
      ...payload
    })
  }

  const onSuccess = rawData => {
    const parsedData = response || get(rawData, 'body')
    const normalized = normalize(parsedData, {
      endpoint,
      camelizeKeys: false
    })

    const payload = { data: normalized }

    const meta = merge(
      { query, signature },
      isLoadRequest && { endpoint, isSuccess: true }
    )

    const data = { meta, payload, type: types.SUCCESS }

    InteractionManager.runAfterInteractions(() => {
      next(nextAction(fsaFields, data))

      subject.next(payload)
      subject.complete()
    })
  }

  apiRequest.subscribe(onSuccess, onError)

  return subject
}
