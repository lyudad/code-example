import { StyleSheet } from 'react-native'

import { Colors, Metrics } from 'Theme'

export default StyleSheet.create({
  backIcon: {
    left: 0,
    top: 0,
    backgroundColor: Colors.white
  },
  list: {
    marginTop: -2,
    backgroundColor: '#efefef'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    width: Metrics.screenWidth,
    height: 60,
    alignItems: 'center',
    marginBottom: 2
  },
  icon: {
    left: 28,
    width: 42,
    height: 42,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20
  },
  text: {
    left: 40
  },
  name: {
    fontFamily: 'Lato',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#565656'
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 7,
    borderBottomColor: Colors.white
  },
  search: {
    fontFamily: 'Lato',
    fontSize: 14,
    fontStyle: 'italic',
    backgroundColor: '#fff',
    width: Metrics.screenWidth * 0.85,
    paddingLeft: 8
  },
  noEmployeesText: {
    textAlign: 'center',
    color: '#b4b4b4',
    fontSize: 15
  }
})
