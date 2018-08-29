import React from 'react'
import { StackNavigator } from 'react-navigation'

import isNil from 'lodash/isNil'

import { appType } from 'Helpers/pickers'

import { branches } from 'Navigation/Constants/routeNames'

import { screen as Tabs } from './Tabs'

import Header from 'Navigation/Headers/Default'
import Fallback from 'Navigation/Screens/Fallback'

const screens = appType({
  employee: {
    ...Tabs
  },

  employer: {
    ...Fallback
  }
})

const EmployeeNavigator = StackNavigator(screens, {
  navigationOptions: ({ navigationOptions }) => ({
    header: props => {
      const { header } = navigationOptions

      if (isNil(header) || typeof header !== 'function') {
        return <Header {...props} />
      }
    },

    gesturesEnabled: false
  })
})

export const screen = {
  [branches.employee]: {
    screen: EmployeeNavigator,

    navigationOptions: {
      header: null
    }
  }
}

export default EmployeeNavigator
