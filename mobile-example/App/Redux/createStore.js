import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'

import Config from 'Config/Debug'
import ReduxPersist from 'Config/ReduxPersist'
import RehydrationServices from 'Services/RehydrationServices'

import api from './Middleware/api'
import screenTracking from './Middleware/screenTracking'

export default (rootReducer, rootSaga) => {
  const middleware = [thunk, api, screenTracking]
  const enhancers = []

  const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  enhancers.push(applyMiddleware(...middleware))

  if (ReduxPersist.active) {
    enhancers.push(autoRehydrate())
  }

  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  if (ReduxPersist.active) {
    RehydrationServices.updateReducers(store)
  }

  sagaMiddleware.run(rootSaga)

  return store
}
