import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import React, { Component } from 'react'
import { Switch, Route } from 'react-router'

import * as routes from 'helpers/routes'

import { isRestored } from 'store/reducers/selectors/app'
import { getLocation } from 'store/reducers/selectors/router'
import { isAuthenticated } from 'store/reducers/selectors/viewer'

import Auth from 'components/pages/Auth'
import Main from 'components/pages/Main'
import Onboarding from 'components/pages/Onboarding'

import { Container } from './styles'
import { Flex } from 'rebass'
import { Spinner } from './ui'
import { branch, renderComponent } from 'recompose'

class App extends Component {
  getAuthenticatedRoutes = () => {
    if (this.props.isAuthenticated) {
      return (
        <Route
          component={Onboarding}
          exact
          key="onboarding"
          path={routes.onboardingPath()}
        />
      )
    } else return null
  }

  render() {
    return (
      <Container direction="column">
        <Switch>
          <Route component={Auth} exact path={routes.authPath()} />
          {this.getAuthenticatedRoutes()}
          <Route component={Main} path={routes.rootPath()} />
        </Switch>
      </Container>
    )
  }
}

const selector = createStructuredSelector({
  isAuthenticated,
  isRestored: isRestored,
  location: getLocation // Force update
})

const SpinnerBig = () =>
  <Flex align="center" justify="center" w={1}>
    <Spinner size="huge" />
  </Flex>

export default connect(selector)(
  branch(props => !props.isRestored, renderComponent(SpinnerBig))(App)
)
