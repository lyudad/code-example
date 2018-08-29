import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Provider as ThemeProvider } from 'rebass'
import './imports/injectGlobals'
import createHistory from 'history/createBrowserHistory'

import './rxjs.config'

import themes from './constants/themes'

import createStore from './store'

import './imports/main.css'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
const history = createHistory()
const store = createStore({ history })
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={themes.main}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('content')
)

if (process.env.NODE_ENV === 'development' && !window.devToolsExtension) {
  const DevTools = require('./components/DevTools').default
  const mountEl =
    document.body && document.body.appendChild(document.createElement('div'))

  ReactDOM.render(
    <Provider store={store}>
      <DevTools />
    </Provider>,
    mountEl
  )
}
registerServiceWorker()
