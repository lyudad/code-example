import Immutable from 'seamless-immutable'

import { createReducer } from 'Redux/Helpers'

import { AUTHENTICATE, LOG_OUT } from 'Redux/Actions/auth'

import {
  LOAD as LOAD_VIEWER
} from 'Redux/Actions/viewer'

const initialState = Immutable({
  id: null,
  JWTToken: null
})

const authSuccess = (state, { payload }) =>
  state.merge({ JWTToken: payload })

const loadViewerSuccess = (state, { payload }) =>
  state.merge({ id: payload.data.meta['/user'].data[0].id })

const reset = () => initialState

const handlers = {
  [AUTHENTICATE.SUCCESS]: authSuccess,
  [LOAD_VIEWER.SUCCESS]: loadViewerSuccess,

  [LOG_OUT]: reset
}

export default createReducer(initialState, handlers)
