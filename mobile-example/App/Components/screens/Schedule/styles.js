import { StyleSheet } from 'react-native'

import { Colors } from 'Theme'

export default StyleSheet.create({
  container: {
    flex: 1
  },

  title: {
    marginTop: 22,
    marginBottom: 15
  },

  titleText: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.tundora
  },

  weekSwitcher: {
    paddingHorizontal: 30,
    marginBottom: 24
  },

  week: {
    paddingHorizontal: 30,
    marginBottom: 24
  },

  actions: {
    paddingHorizontal: 36
  },

  actionsTitle: {
    marginBottom: 15
  },

  actionsTitleText: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.scorpion
  },

  action: {
    marginBottom: 15
  }
})
