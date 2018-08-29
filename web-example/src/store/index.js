import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware as router } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import cookiesHelpers from 'helpers/cookies'

import api from './middleware/api'
import cookies from './middleware/cookies'
import notObject from './middleware/notObject'

import rootReducer from './reducers'
import rootSaga from 'sagas'

import { cookiesSelector } from './reducers/selectors/cookies'

import { completeRehydration } from 'actions/app'
import { cookiesRehydrate } from 'actions/persist'

export default ({ history }) => {
  const middleware = [
    thunk,
    notObject,
    api,
    router(history),
    cookies(cookiesSelector)
  ]

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  let enhancer
  if (process.env.NODE_ENV === 'development') {
    enhancer = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension
        ? window.devToolsExtension()
        : require('components/DevTools').default.instrument()
    )
  } else if (
    window.devToolsExtension &&
    window.location.hash === '#magic.exe'
  ) {
    enhancer = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension()
    )
  } else {
    enhancer = applyMiddleware(...middleware)
  }

  const store = createStore(rootReducer, enhancer)

  // Restore persistent data
  store.dispatch(cookiesRehydrate(cookiesHelpers.get()))
  setTimeout(() => store.dispatch(completeRehydration()), 0)

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers').default)
    )
  }

  return store
}
