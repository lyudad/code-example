import { API_CALL } from 'store/middleware/ids'

export const apiCall = fields => ({
  type: API_CALL,
  fields
})
