import { Text } from 'react-native'

import './Rx'
import DebugConfig from './Debug'
import AppConfig from './App'

Text.defaultProps.allowFontScaling = AppConfig.allowTextFontScaling

if (__DEV__) {
  console.disableYellowBox = !DebugConfig.yellowBox
}
