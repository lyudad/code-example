import React, { PureComponent } from 'react'
import { View, ScrollView } from 'react-native'
import PT from 'prop-types'

import { WeekSwitcher } from 'Components/blocks'
import { Text } from 'Components/ui'
import Action from './Action'
import Week from './Week'

import styles from './styles'

class Schedule extends PureComponent {
  componentWillMount () {
    this.props.onInit()
  }

  shiftWeek = diff => {
    const week = this.props.week.clone()

    week.start.add(diff, 'week')
    week.end.add(diff, 'week')

    this.props.onWeekShift(week)
  }

  handleWeekBackward = () => {
    this.shiftWeek(-1)
  }

  handleWeekForward = () => {
    this.shiftWeek(1)
  }

  render () {
    const {
      week, isLoading,
      onTradeShift, onFindCover, onRequestTimeOff, onCantMake
    } = this.props

    if (isLoading) {
      return <Text>Loading</Text>
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.title}>
          <Text fontFamily='Prompt' style={styles.titleText}>
            Your schedule
          </Text>
        </View>

        <View style={styles.weekSwitcher}>
          <WeekSwitcher
            week={week}
            onWeekBackward={this.handleWeekBackward}
            onWeekForward={this.handleWeekForward}
          />
        </View>

        <View style={styles.week}>
          <Week week={week} />
        </View>

        <View style={styles.actions}>
          <View style={styles.actionsTitle}>
            <Text fontFamily='Prompt' style={styles.actionsTitleText}>
              Actions
            </Text>
          </View>

          <View style={styles.action}>
            <Action text='Trade shift' onPress={onTradeShift} />
          </View>

          <View style={styles.action}>
            <Action text='Find cover' onPress={onFindCover} />
          </View>

          <View style={styles.action}>
            <Action text='Request Time Off' onPress={onRequestTimeOff} />
          </View>

          <View style={styles.action}>
            <Action text='I can’t make it today' onPress={onCantMake} />
          </View>
        </View>
      </ScrollView>
    )
  }
}

Schedule.propTypes = {
  isLoading: PT.bool.isRequired,
  week: PT.shape({
    clone: PT.func.isRequired,
    end: PT.object.isRequired,
    start: PT.object.isRequired
  }).isRequired,
  onCantMake: PT.func.isRequired,
  onFindCover: PT.func.isRequired,
  onInit: PT.func.isRequired,
  onRequestTimeOff: PT.func.isRequired,
  onTradeShift: PT.func.isRequired,
  onWeekShift: PT.func.isRequired
}

export default Schedule
