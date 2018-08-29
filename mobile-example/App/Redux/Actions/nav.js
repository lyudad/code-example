import { NavigationActions } from 'react-navigation'

import { common } from 'Navigation/Constants/routeNames'

export const TOP_LEVEL_REDIRECT = 'TOP_LEVEL_REDIRECT'
export const topLevelRedirect = routeName => ({
  type: TOP_LEVEL_REDIRECT,
  payload: {
    index: 0,
    routes: [{ routeName, key: 'Init' }]
  }
})

export const navigateToRedirector = () =>
  topLevelRedirect(common.redirector)

export const navigateTo = (routeName, params) =>
  NavigationActions.navigate({ routeName, params })

export const navigateAndResetTo = (...args) =>
  NavigationActions.reset({
    index: 0,
    actions: [navigateTo(...args)]
  })

export const goBack = () => NavigationActions.back(null)
