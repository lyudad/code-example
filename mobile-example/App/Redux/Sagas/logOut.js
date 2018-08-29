import { put, take } from 'redux-saga/effects'

import { LOG_OUT } from 'Redux/Actions/auth'
import { navigateToRedirector } from 'Redux/Actions/nav'

const logOut = function * logOut () {
  while (true) {
    yield take(LOG_OUT)
    yield put(navigateToRedirector())
  }
}

export default logOut
