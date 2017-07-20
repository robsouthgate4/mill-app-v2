import {handleRequest} from '../lib/handleRequest'
import { handleApiErrors } from '../lib/api-errors'

const loginUrl = `${process.env.REACT_APP_API_URL}/api/Clients/login`

export const loginApi = (email, password) => {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}
