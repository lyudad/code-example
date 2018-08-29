import { createSelector } from 'reselect'

import { appTypeLazy } from 'Helpers/pickers'
import withRedirect from 'Navigation/Helpers/withRedirect'

import {
  common,
  branches,
  development
} from 'Navigation/Constants/routeNames'

import {
  isEmployer,
  isApplicant,
  isAuthenticated
} from 'Redux/Selectors/viewer'

import Component from 'Components/screens/Redirector'

const sceneSelector = appTypeLazy({
  employee: () =>
    createSelector(
      isAuthenticated,
      isEmployer,
      isApplicant,
      (authenicated, employer, applicant) => {
        if (authenicated) {
          if (employer) return branches.employer
          if (applicant) return branches.applicant
          return branches.employee
        }

        return common.auth
      }
    ),

  employer: () =>
    createSelector(
      isAuthenticated,
      authed => {
        if (authed) return development.fallback
        return common.auth
      }
    )
})

export default {
  [common.redirector]: {
    screen: withRedirect(sceneSelector)(Component),

    navigationOptions: {
      header: null
    }
  }
}
