import React, { Component } from 'react'
import { View, BackHandler } from 'react-native'
import PT from 'prop-types'
import { addNavigationHelpers } from 'react-navigation'

import AppNavigator from './Navigators/App'
import { Toast } from 'Components/blocks'

class Router extends Component {
  constructor (props) {
    super(props)
    this.onBack = this.onBack.bind(this)
  }

  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBack)

    if (this.props.isRestored) {
      this.onRestore()
    }
  }

  componentWillReceiveProps (props) {
    if (!this.props.isRestored && props.isRestored) {
      this.onRestore()
    }
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBack)
  }

  onBack () {
    this.props.onBack()
    return true
  }

  onRestore () {
    // platformLazy({ ios: () => setTimeout(SplashScreen.hide, 0) })
  }

  render () {
    if (!this.props.isRestored) return null

    return (
      <View style={{ flex: 1 }}>
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav
          })}
        />

        <Toast />
      </View>
    )
  }
}

Router.propTypes = {
  dispatch: PT.func.isRequired,
  isRestored: PT.bool.isRequired,
  nav: PT.object.isRequired,
  onBack: PT.func.isRequired
}

export const router = AppNavigator.router

export default Router
