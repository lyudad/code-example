import { StackNavigator } from 'react-navigation'

import { common } from 'Navigation/Constants/routeNames'

import { screen as Employee } from './Employee'
import { screen as Employer } from './Employer'
import { screen as Applicant } from './Applicant'

import Header from 'Navigation/Headers/Simple'

import Auth from 'Navigation/Screens/Auth'
import Redirector from 'Navigation/Screens/Redirector'
import Chat from 'Navigation/Screens/Chat'
import ChatProfile from 'Navigation/Screens/ChatProfile'

import Fallback from 'Navigation/Screens/Fallback'

const commonScreens = {
  ...Auth,
  ...Fallback,
  ...Redirector,
  ...Chat,
  ...ChatProfile,

  ...Employee,
  ...Employer,
  ...Applicant
  // ...Profile,
  // ...EditCar,
  // ...EditContactDetails,
  // ...EditEducation,
  // ...EditLang,
  // ...EditPersonalInformation,
  // ...EditWorkExperience
}

const developmentScreens = {
  ...Fallback
}

const typeSpecificScreens = {}

const AppNavigator = StackNavigator({
  ...commonScreens,
  ...developmentScreens,
  ...typeSpecificScreens
}, {
  initialRouteName: common.redirector,

  navigationOptions: {
    header: Header
  }
})

export default AppNavigator
