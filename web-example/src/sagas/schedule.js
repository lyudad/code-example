import { all, put, take, select, fork } from 'redux-saga/effects'
import get from 'lodash/get'

import {
  INIT,
  LOAD_ALL_EMPLOYEES,
  LOAD_RANGE,
  ADD,
  LOAD_ALL_DEPARTMENTS,
  INIT_SHIFT_ADDING,
  ADD_SHIFT,
  loadEmployees,
  loadSchedules,
  loadDepartments,
  initDone,
  addShift,
  createSchedule
} from 'actions/schedule'
import { loadViewerCompanies, LOAD_VIEWER_COMPANIES } from 'actions/viewer'
import {
  getScheduleById,
  getDepartment
} from 'store/reducers/selectors/schedule'
import { getUserCompanyId } from 'store/reducers/selectors/companies'
import { waitForTypes } from 'helpers/sagas'

export function* initialLoad() {
  while (true) {
    yield take(INIT)
    yield put(loadSchedules())
    yield take(LOAD_RANGE.SUCCESS)
    let userCompanyId = yield select(getUserCompanyId)
    if (!userCompanyId) {
      yield put(loadViewerCompanies())
      yield take(LOAD_VIEWER_COMPANIES.SUCCESS)
      userCompanyId = yield select(getUserCompanyId)
      yield put(loadEmployees(userCompanyId))
      yield put(loadDepartments(userCompanyId))
      yield waitForTypes([
        LOAD_ALL_EMPLOYEES.SUCCESS,
        LOAD_ALL_DEPARTMENTS.SUCCESS
      ])
      yield put(initDone())
    } else {
      yield put(loadEmployees(userCompanyId))
      yield put(loadDepartments(userCompanyId))
      yield waitForTypes([
        LOAD_ALL_EMPLOYEES.SUCCESS,
        LOAD_ALL_DEPARTMENTS.SUCCESS
      ])
      yield put(initDone())
    }
  }
}

export function* shiftAdding() {
  while (true) {
    const {
      payload: { date, employee, scheduleId, startAt, finishAt, color }
    } = yield take(INIT_SHIFT_ADDING)
    const isScheduleCreated = yield select(getScheduleById(scheduleId))
    if (!!isScheduleCreated) {
      yield put(
        addShift(
          date,
          get(employee, 'job.id'),
          scheduleId,
          startAt,
          finishAt,
          color
        )
      )
      yield take(ADD_SHIFT.SUCCESS)
      yield put(loadSchedules())
    } else {
      yield put(createSchedule(date, employee, yield select(getDepartment)))
      const { payload } = yield take(ADD.SUCCESS)
      const { schedules } = payload.data
      const getFirst = objectArray => objectArray[Object.keys(objectArray)[0]]
      const { id } = getFirst(schedules)
      yield put(
        addShift(date, get(employee, 'job.id'), id, startAt, finishAt, color)
      )
      yield take(ADD_SHIFT.SUCCESS)
      yield put(loadSchedules())
    }
  }
}

export default function* rootSchedule() {
  yield all([fork(initialLoad), fork(shiftAdding)])
}
