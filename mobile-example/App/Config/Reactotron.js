import Immutable from 'seamless-immutable'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

import Config from './Debug'

if (Config.useReactotron) {
  Reactotron
    .configure({ name: 'WorkAxle App' })
    .useReactNative()
    .use(reduxPlugin({ onRestore: Immutable }))
    .use(sagaPlugin())
    .connect()

  Reactotron.clear()

  console.tron = Reactotron
}
