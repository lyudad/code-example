import { API_CALL } from 'Redux/Middleware/ids'

export const apiCall = fields => ({
  type: API_CALL,
  fields
})
