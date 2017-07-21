import { CLIENT_SET, CLIENT_UNSET } from './constants'


export const setClient = (token) => {
  return {
    type: CLIENT_SET,
    token,
  }
}

export const unsetClient = () => {
  return {
    type: CLIENT_UNSET
  }
}
