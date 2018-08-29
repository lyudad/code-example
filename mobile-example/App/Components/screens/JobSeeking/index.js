import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getIsLoading } from 'Redux/Selectors/Applicant/jobSeeking'

import { loadCompanies } from 'Redux/Actions/Applicant/jobSeeking'

import Component from './JobSeeking'

const selector = createStructuredSelector({
  isLoading: getIsLoading
})

const actions = {
  onInit: loadCompanies
}

export default connect(selector, actions)(Component)
