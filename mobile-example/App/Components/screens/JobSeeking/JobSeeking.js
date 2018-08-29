import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PT from 'prop-types'

import { Text } from 'Components/ui'

import styles from './styles'

class JobSeeking extends PureComponent {
  componentWillMount () {
    this.props.onInit()
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>JobSeeking</Text>
      </View>
    )
  }
}

JobSeeking.propTypes = {
  onInit: PT.func.isRequired
}

export default JobSeeking
