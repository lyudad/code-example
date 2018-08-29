import { TabNavigator, TabBarBottom } from 'react-navigation'

import { employee } from 'Navigation/Constants/routeNames'

import { screen as ScheduleTab } from './ScheduleTab'

import ChatTab from 'Navigation/Screens/Employee/ChatTab'
import NewsTab from 'Navigation/Screens/Employee/NewsTab'
import NotificationsTab from 'Navigation/Screens/Employee/NotificationsTab'

const TabsNavigator = TabNavigator({
  ...ScheduleTab,
  ...NewsTab,
  ...ChatTab,
  ...NotificationsTab
}, {
  lazy: true,
  swipeEnabled: false,
  animationEnabled: false,
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom'
})

export const screen = {
  [employee.tabs]: {
    screen: TabsNavigator
  }
}

export default TabsNavigator
