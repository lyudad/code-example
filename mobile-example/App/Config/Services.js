import Config from 'react-native-config'

export const api = {
  url: Config.API_URL
}

export const auth0 = {
  domain: Config.AUTH_DOMAIN,
  clientId: Config.AUTH_CLIENT_ID,
  audience: Config.AUTH_AUDIENCE
}

export const pusher = {
  token: Config.PUSHER_TOKEN,
  options: {
    authEndpoint: `${api.url}/pusher/auth`,
    encrypted: true
  }
}
