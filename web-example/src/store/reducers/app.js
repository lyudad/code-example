import { createReducer } from 'helpers/redux'

import { COMPLETE_REHYDRATION, COMPLETE_REFETCH } from 'actions/app'

const initialState = {
  rehydrationComplete: false,
  isRefetched: false
}

const completeRehydration = state => ({
  ...state,
  rehydrationComplete: true
})

const completeRefetch = state => ({
  ...state,
  isRefetched: true
})

const handlers = {
  [COMPLETE_REHYDRATION]: completeRehydration,
  [COMPLETE_REFETCH]: completeRefetch
}

export default createReducer(initialState, handlers)
