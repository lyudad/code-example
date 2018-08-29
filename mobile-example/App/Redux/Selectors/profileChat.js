import { createSelector } from 'reselect'

export const getChatProfiles = state => state.profileChat

export const getChatProfileData = createSelector(
  getChatProfiles,
  profiles => profiles
)
