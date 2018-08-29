import { put, select } from 'redux-saga/effects'

import some from 'lodash/some'

import { formatDate } from 'Helpers/dates'

import { getSchedules } from 'Redux/Selectors/Employee/schedule'

import { loadSchedules } from 'Redux/Actions/Employee/schedule'

const loadSchedule = function * (week) {
  const schedules = yield select(getSchedules)

  const startAt = formatDate(week.start)
  const endAt = formatDate(week.end)

  const isLoaded = some(schedules, {
    'start-at': startAt,
    'finish-at': endAt
  })

  if (!isLoaded) {
    yield put(loadSchedules(startAt, endAt))
  }
}

export default loadSchedule
