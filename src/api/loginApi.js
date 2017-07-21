import {handleRequest} from '../lib/handleRequest'
import {handleApiErrors} from '../lib/api-errors'

const loginUrl = `${process.env.REACT_APP_API_URL}/api/login`

export const loginApi = (username, password) => {

    let formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    console.log(username, password)

    return fetch(loginUrl, {
        method: 'POST',
        body: formData
    }).then(handleApiErrors)
        .then(response => response.json())
        .then(json => json)
        .catch((error) => {
            throw error
        })
}
