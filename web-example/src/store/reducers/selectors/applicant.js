import { createSelector } from 'reselect'

export const getState = state => state.applicant

export const isLoading = createSelector(
  getState,
  applicant => applicant.isLoading
)

export const isLoaded = createSelector(
  getState,
  applicant => applicant.isLoaded
)
