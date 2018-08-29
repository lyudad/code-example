import { put, take, fork } from 'redux-saga/effects'

import loadSchedule from './flows/loadSchedule'

import {
  initDone,
  loadSchedules,

  INIT,
  SHIFT_WEEK,
  LOAD_SCHEDULES
} from 'Redux/Actions/Employee/schedule'

const init = function * init () {
  while (true) {
    yield take(INIT)
    yield put(loadSchedules())

    yield take(LOAD_SCHEDULES.SUCCESS)
    yield put(initDone())
  }
}

const shiftWeek = function * shiftWeek () {
  while (true) {
    const { payload } = yield take(SHIFT_WEEK)
    yield loadSchedule(payload)
  }
}

const root = function * root () {
  yield [
    fork(init),
    fork(shiftWeek)
  ]
}

export default root
