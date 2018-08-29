import moment from 'moment'

export const weekOfMonth = m =>
  m.isoWeek() - moment(m).startOf('month').isoWeek() + 1

export const formatDate = m =>
  m.format('YYYY-MM-DD')
