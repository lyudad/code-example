import { router } from 'Navigation'

import { TOP_LEVEL_REDIRECT } from 'Redux/Actions/nav'

export default (state, action) => {
  if (action.type === TOP_LEVEL_REDIRECT) {
    return { ...state, ...action.payload }
  }

  return router.getStateForAction(action, state) || state
}
