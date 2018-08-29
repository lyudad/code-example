import { fork } from 'redux-saga/effects'

import { appType } from 'Helpers/pickers'

import employee from './Employee'
import employer from './Employer'

import logOut from './logOut'

const root = function * root () {
  const common = [logOut]
  const typeSpecific = appType({ employee, employer })

  yield [...common, ...typeSpecific].map(saga => fork(saga))
}

export default root
