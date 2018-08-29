/* eslint react/prop-types: 0 */

import React from 'react'
import { Image } from 'react-native'
import { StackNavigator } from 'react-navigation'

import { Colors, Images } from 'Theme'

import { employee } from 'Navigation/Constants/routeNames'

import Header from 'Navigation/Headers/Default'
import CantWorkToday from 'Navigation/Screens/Employee/CantWorkToday'
import FindCover from 'Navigation/Screens/Employee/FindCover'
import RequestTimeOff from 'Navigation/Screens/Employee/RequestTimeOff'
import Schedule from 'Navigation/Screens/Employee/Schedule'
import TradeShift from 'Navigation/Screens/Employee/TradeShift'

const screens = {
  ...Schedule,
  ...TradeShift,
  ...FindCover,
  ...RequestTimeOff,
  ...CantWorkToday
}

const ScheduleTabNavigator = StackNavigator(screens, {
  navigationOptions: {
    header: props => <Header {...props} />,
    gesturesEnabled: false
  },

  cardStyle: {
    backgroundColor: Colors.white
  }
})

export const screen = {
  [employee.scheduleTab]: {
    screen: ScheduleTabNavigator,

    navigationOptions: {
      title: 'Schedule',

      tabBarIcon: ({ tintColor }) => (
        <Image source={Images.iconSchedule} style={{ tintColor }} />
      )
    }
  }
}

export default ScheduleTabNavigator
