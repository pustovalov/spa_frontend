import moment from 'moment'

export const generateParams = params => {
  let esc = encodeURIComponent
  let query = Object.keys(params)
                .map(k => esc(k) + '=' + esc(params[k]))
                .join('&')
  return query
}

export const formatDate = date => (
  moment(date).format('MMMM Do YYYY, h:mm:ss A')
)

export const setHeaders = (jwt) => {
  return {
    'Content-Type':'application/json',
    ...jwt && {'authorization': `Bearer ${jwt}`}
  }
}
