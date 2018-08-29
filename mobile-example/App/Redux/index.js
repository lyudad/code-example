import createStore from './createStore'

import rootSaga from './Sagas'
import rootReducer from './Reducers'

export default () =>
  createStore(rootReducer, rootSaga)
