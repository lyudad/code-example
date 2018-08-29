import { take } from 'redux-saga/effects'

import loadSchedule from './flows/loadSchedule'

import { SHIFT_WEEK } from 'Redux/Actions/Employee/requestTimeOff'

const shiftWeek = function * shiftWeek () {
  while (true) {
    const { payload } = yield take(SHIFT_WEEK)
    yield loadSchedule(payload)
  }
}

export default shiftWeek
