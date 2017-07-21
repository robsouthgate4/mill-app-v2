import { setClient } from '../client/actions'

export const checkAuthorization = () => {
  // attempt to grab the token from localstorage
  const storedToken = localStorage.getItem('token')

  if (storedToken) {

    const token = JSON.parse(atob(storedToken.split('.')[1]))

    const created = token.iat
    const expiry = token.exp

    return created < expiry

  }

  return false
}
