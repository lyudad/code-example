import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { isRestored } from 'Redux/Selectors/app'
import { getNavState } from 'Redux/Selectors/nav'

import { goBack } from 'Redux/Actions/nav'

import Component, { router as rootRouter } from './Router'

const selector = createStructuredSelector({
  isRestored,
  nav: getNavState
})

const actions = dispatch => ({
  dispatch,
  ...bindActionCreators({ onBack: goBack }, dispatch)
})

export const router = rootRouter

export default connect(selector, actions)(Component)
