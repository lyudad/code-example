import { createSelector } from 'reselect'

import { isAuthenticated } from './viewer'

const getState = state => state.app

export const isRehydrationComplete = createSelector(
  getState,
  state => state.rehydrationComplete
)

export const isRefetched = createSelector(
  getState,
  state => state.isRefetched
)

export const isRestored = createSelector(
  isRehydrationComplete,
  isAuthenticated,
  isRefetched,
  (rehydrated, authed, refetched) => {
    if (rehydrated) {
      if (!authed) return true
      return refetched
    }

    return false
  }
)
