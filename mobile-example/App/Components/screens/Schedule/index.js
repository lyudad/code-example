import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { employee } from 'Navigation/Constants/routeNames'

import {
  getWeek,
  getIsLoading
} from 'Redux/Selectors/Employee/schedule'

import { navigateTo } from 'Redux/Actions/nav'

import {
  init,
  shiftWeek
} from 'Redux/Actions/Employee/schedule'

import Component from './Schedule'

const selector = createStructuredSelector({
  isLoading: getIsLoading,
  week: getWeek
})

const actions = {
  onInit: init,
  onWeekShift: shiftWeek,

  onCantMake: () => navigateTo(employee.cantWorkToday),
  onFindCover: () => navigateTo(employee.findCover),
  onTradeShift: () => navigateTo(employee.tradeShift),
  onRequestTimeOff: () => navigateTo(employee.requestTimeOff)
}

export default connect(selector, actions)(Component)
