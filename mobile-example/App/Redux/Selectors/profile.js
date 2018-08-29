import { createSelector } from 'reselect'

export const getProfiles = state => state.profile

export const getProfile = createSelector(
  getProfiles,
  profiles => profiles
)

export const getUserProfile = createSelector(
  getProfiles,
  profiles => profiles.userProfile
)
