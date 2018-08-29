import { fork, all } from 'redux-saga/effects'

import restoreSession from './restoreSession'
import employee from './employee'
import schedule from './schedule'

export default function* root() {
  yield all([fork(restoreSession), fork(employee), fork(schedule)])
}
