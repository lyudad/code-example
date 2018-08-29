import { createSelector } from 'reselect'

import get from 'lodash/get'

import ReduxEntities from 'Services/ReduxEntities'

import { getData } from './data'

const getState = state => state.viewer

export const getId = createSelector(getState, state => state.id)
export const getJWTToken = createSelector(getState, state => state.JWTToken)

export const getJWTHeader = createSelector(
  getJWTToken,
  token => token ? `Bearer ${token}` : null
)

export const getViewer = createSelector(getData, getId, (data, id) =>
  ReduxEntities.denormalize(data, 'users', id)
)

export const getViewerRole = createSelector(
  getViewer,
  viewer => get(viewer, 'role')
)

export const getEmployee = createSelector(
  getViewer,
  viewer => get(viewer, 'employee')
)

export const getEmployeeId = createSelector(
  getEmployee,
  employee => get(employee, 'id')
)

export const getDepartment = createSelector(
  getEmployee,
  employee => get(employee, 'job.department')
)

export const getDepartmentId = createSelector(
  getDepartment,
  department => get(department, 'id')
)

export const getCurrentCompany = createSelector(
  getEmployee,
  employee => get(employee, 'company')
)

export const isEmployer = createSelector(
  getViewerRole,
  getEmployee,
  (role, employee) => role === 'employer' && !employee
)

export const isApplicant = createSelector(
  getViewerRole,
  role => role === 'applicant'
)

export const isAuthenticated = createSelector(
  getJWTToken,
  token => token !== null
)
