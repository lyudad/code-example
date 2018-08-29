import React, { PureComponent } from 'react'
import { Button as ButtonRN } from 'react-native-elements'

import { Colors } from 'Theme'

class Button extends PureComponent {
  render () {
    return (
      <ButtonRN
        buttonStyle={{
          backgroundColor: Colors.matisse,
          borderRadius: 100
        }}
        {...this.props}
      />
    )
  }
}

Button.propTypes = ButtonRN.propTypes

export { Button }
