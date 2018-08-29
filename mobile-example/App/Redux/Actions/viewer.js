import { createAsyncAction } from 'Redux/Helpers'

import { apiCall } from './api'

export const LOAD = createAsyncAction('viewer/LOAD')
export const load = () =>
  apiCall({
    endpoint: '/user',
    query: {
      include: 'profile,employee,employee.*'
    },
    types: LOAD
  })
