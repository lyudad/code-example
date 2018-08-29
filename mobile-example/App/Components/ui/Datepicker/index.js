import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-native-datepicker'

import styles from './styles'

class Datepicker extends PureComponent {
  onPressDate () {
    this.refs.picker.onPressDate()
  }

  render () {
    return (
      <DatePicker
        {...this.props}
        cancelBtnText='Cancel'
        confirmBtnText='Confirm'
        customStyles={{
          dateInput: styles.dateInput,
          dateText: styles.dateText,
          placeholderText: styles.placeholderText
        }}
        date={this.props.value}
        is24Hour={false}
        minuteInterval={10}
        ref='picker'
        showIcon={false}
      />
    )
  }
}

Datepicker.propTypes = {
  value: PropTypes.string
}

export { Datepicker }
