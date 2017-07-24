import {
  LOGIN_REQUESTING,
  LOGOUT
} from './constants'

export const loginRequest = ({ username, password }) => ({
    type: LOGIN_REQUESTING,
    username,
    password
})

export const logout = () => {
    console.log('dispatched')
    return {
        type: LOGOUT
    }
}
