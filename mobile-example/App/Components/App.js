import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import createStore from 'Redux'

import 'Config'
import Debug from 'Config/Debug'
import Router from 'Navigation'

const store = createStore()

class App extends PureComponent {
  render () {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default Debug.useReactotron
  ? console.tron.overlay(App)
  : App
