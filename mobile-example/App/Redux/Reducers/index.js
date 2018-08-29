import { combineReducers } from 'redux'

import { appType } from 'Helpers/pickers'
import employee from './Employee'

import app from './app'
import data from './data'
import nav from './nav'
import toastMessage from './toastMessage'
import viewer from './viewer'


const common = {
  app,
  nav,
  data,
  toastMessage,
  viewer,

  ...applicant
}

const typeSpecific = appType({ employee, employer })

export default combineReducers({
  ...common,
  ...typeSpecific
})
