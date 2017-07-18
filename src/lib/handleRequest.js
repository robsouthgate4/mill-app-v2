import { handleApiErrors } from './api-errors'

/* Helper function to deal with requests */
export const handleRequest = (request) => {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}
