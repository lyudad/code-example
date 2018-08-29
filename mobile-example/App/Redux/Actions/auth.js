import Auth0 from 'react-native-auth0'

import { createAsyncAction } from 'Redux/Helpers'

import { auth0 } from 'Config/Services'

export const LOG_OUT = 'LOG_OUT'
export const logOut = () => ({
  type: LOG_OUT
})

export const AUTHENTICATE = createAsyncAction('AUTHENTICATE')
export const authenticate = () => dispatch => {
  const client = new Auth0({
    domain: auth0.domain,
    clientId: auth0.clientId
  })

  dispatch({ type: AUTHENTICATE.REQUEST })

  client
    .webAuth
    .authorize({
      scope: 'openid email',
      audience: auth0.audience
    })
    .then(({ accessToken }) =>
      dispatch({ type: AUTHENTICATE.SUCCESS, payload: accessToken }))
    .catch(error =>
      dispatch({ type: AUTHENTICATE.FAILURE, payload: error }))
}
