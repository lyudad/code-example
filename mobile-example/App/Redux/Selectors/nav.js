import { createSelector } from 'reselect'

import getCurrentRouteNameImpl from 'Navigation/Helpers/getCurrentRouteName'

export const getNavState = state => state.nav

export const getCurrentRouteName = createSelector(
  getNavState,
  getCurrentRouteNameImpl
)
