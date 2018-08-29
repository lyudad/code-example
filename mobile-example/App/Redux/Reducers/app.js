import Immutable from 'seamless-immutable'

import { createReducer } from 'Redux/Helpers'

import { COMPLETE_REHYDRATION, COMPLETE_REFETCH } from 'Redux/Actions/app'
import { LOG_OUT } from 'Redux/Actions/auth'

const initialState = Immutable({
  rehydrationComplete: false,
  isRefetched: false
})

const completeRehydration = state =>
  state.merge({ rehydrationComplete: true })

const completeRefetch = state =>
  state.merge({ isRefetched: true })

const reset = () =>
  initialState.merge({ rehydrationComplete: true })

const handlers = {
  [COMPLETE_REHYDRATION]: completeRehydration,
  [COMPLETE_REFETCH]: completeRefetch,

  [LOG_OUT]: reset
}

export default createReducer(initialState, handlers)
