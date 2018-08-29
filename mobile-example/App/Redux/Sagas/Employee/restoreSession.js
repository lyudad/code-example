import { put, call, race, select, take } from 'redux-saga/effects'

import { waitForTypes } from 'Redux/Helpers/sagas'

import { isAuthenticated } from 'Redux/Selectors/viewer'

import { completeRefetch, COMPLETE_REHYDRATION } from 'Redux/Actions/app'
import { logOut, AUTHENTICATE } from 'Redux/Actions/auth'
import { navigateToRedirector } from 'Redux/Actions/nav'

import {
  load,
  LOAD
} from 'Redux/Actions/viewer'

function * fetchResources () {
  yield put(load())

  yield waitForTypes([
    LOAD.SUCCESS
  ])

  yield put(completeRefetch())
}

const restoreSession = function * restoreSession () {
  while (true) {
    const action = yield take([
      AUTHENTICATE.SUCCESS,
      COMPLETE_REHYDRATION
    ])

    const isAuthed = yield select(isAuthenticated)

    if (!isAuthed) continue

    const { failure } = yield race({
      success: call(fetchResources),
      failure: take([
        LOAD.FAILURE
      ])
    })

    if (failure) {
      yield put(logOut())
    } else if (action.type === AUTHENTICATE.SUCCESS) {
      yield put(navigateToRedirector())
    }
  }
}

export default restoreSession
