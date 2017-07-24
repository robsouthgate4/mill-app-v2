import { setClient } from '../modules/client/actions'

export const checkAuthorization = ({dispatch}) => {

    const storedToken = localStorage.getItem('token')

    if (storedToken) {

        const token = JSON.parse(atob(storedToken.split('.')[1]))
        const created = token.iat
        const expiry = token.exp

        dispatch(setClient(JSON.parse(storedToken)))

        return created < expiry

    }
    return false
}
