import React, { Component } from 'react'
import { View, TextInput, FlatList, TouchableHighlight, Image } from 'react-native'
import { Text } from 'Components/ui'
import { Preloader } from 'Components/blocks'
import PropTypes from 'prop-types'

import { Icon } from 'react-native-elements'
import { Images } from 'Theme'

import toArray from 'lodash/toArray'
import isEmpty from 'lodash/isEmpty'

import styles from './styles'

class EmployeeList extends Component {
  constructor (props) {
    super(props)

    const { profiles, isLoading, isLoaded, employer } = this.props.employees
    const employerProfile = employer.profiles[Object.keys(employer.profiles)[0]]
    const profilesWithEmployer = [employerProfile, ...toArray(profiles)]

    this.state = {
      profiles: profilesWithEmployer,
      isLoaded,
      isLoading,
      currFilter: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    const { profiles, isLoading, isLoaded, employer } = nextProps.employees
    const employerProfile = employer.profiles[Object.keys(employer.profiles)[0]]
    const profilesWithEmployer = [employerProfile, ...toArray(profiles)]

    this.setState({
      profiles: profilesWithEmployer,
      isLoaded,
      isLoading
    })
  }
  getvisibleEmployees = (data) => {
    if (this.state.currFilter === '') {
      return data
    } else {
      return (
        data.filter((item) =>
          (item.attributes['first-name'] + ' ' + item.attributes['last-name']).toLowerCase()
            .indexOf(this.state.currFilter.toLowerCase()) > -1
        ))
    }
  }

  renderEmployee = (data) => {
    const { item } = data
    const avatar = item.attributes.avatar.thumb.url

    return (
      <TouchableHighlight onPress={(event) => {
        const userId = item.relationships.user.data.id
        this.props.createChat(userId)
      }}>
        <View style={styles.item}>
          <Image
            source={!isEmpty(avatar) ? { uri: avatar } : Images.defaultAvatar}
            style={styles.icon}
          />
          <View style={styles.text}>
            <Text key={item.id} style={styles.name}>{item.attributes['first-name'] + ' ' + item.attributes['last-name']}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render () {
    const { profiles, isLoading, isLoaded } = this.state

    const visibleEmployees = this.getvisibleEmployees(profiles).filter(item => item.id !== this.props.userId)
    const isListEmpty = isEmpty(profiles)
    return (
      <View style={{flex: 1}}>
        <View style={styles.searchContainer}>
          <TouchableHighlight
            onPress={this.props.onShowChatList}
          >
            <View>
              <Icon color='#b1b1b1'
                name='arrow-back'
                size={40}
                style={styles.backIcon}
              />
            </View>
          </TouchableHighlight>
          <TextInput
            autoFocus
            placeholder={'Search...'}
            style={styles.search}
            text={this.state.currFilter}
            onChangeText={text => this.setState({currFilter: text})}
          />
        </View>
        { isLoading &&
          <View style={{flex: 1}}>
            <Preloader />
          </View>
        }
        { isLoaded &&
          isListEmpty
          ? (<View style={{flex: 1}}>
            <Text style={styles.noEmployeesText}>There is no employees</Text>
          </View>) : (
            <View style={{flex: 1}}>
              <FlatList
                data={visibleEmployees}
                keyExtractor={item => item.id}
                renderItem={this.renderEmployee}
                style={styles.list}
              />
            </View>
          )
        }
      </View>
    )
  }
}

EmployeeList.propTypes = {
  createChat: PropTypes.func,
  employees: PropTypes.object,
  userId: PropTypes.string,
  onShowChatList: PropTypes.func
}

export {EmployeeList}
