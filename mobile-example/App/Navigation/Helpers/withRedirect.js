import React, { PureComponent } from 'react'
import PT from 'prop-types'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { navigateAndResetTo } from 'Redux/Actions/nav'

export default sceneSelector => WrappedComponent => {
  class Redirect extends PureComponent {
    componentWillMount () {
      this.redirectIfNeeded()
    }

    componentDidUpdate (prevProps) {
      this.redirectIfNeeded()
    }

    redirectIfNeeded (props = {}) {
      const { scene, dispatch } = this.props

      if (scene && props.scene !== scene) {
        dispatch(navigateAndResetTo(scene))
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  const selector = createStructuredSelector({
    scene: sceneSelector
  })

  Redirect.propTypes = {
    dispatch: PT.func.isRequired,
    scene: PT.oneOfType([
      PT.string,
      PT.bool
    ]).isRequired
  }

  const Wrapper = connect(selector)(Redirect)
  Wrapper.router = WrappedComponent.router
  Wrapper.navigationOptions = WrappedComponent.navigationOptions
  return Wrapper
}
