import {handleRequest} from '../lib/handleRequest'
import {handleApiErrors} from '../lib/api-errors'

const categoriesUrl = `${process.env.REACT_APP_LOCAL_URL}`

export const categoryCreateApi = (client, category) => {
    const url = `${categoriesUrl}`
    const request = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // passes our token as an "Authorization" header in
            // every POST request.
            //Authorization: client.token.id || undefined, // will throw an error if no login
        },
        body: JSON.stringify(category)
    })
    return handleRequest(request)
}

export const categoryRequestApi = (client) => {
    const url = `${categoriesUrl}/categories`
    const request = fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // passe our token as an "Authorization" header
            //Authorization: client.token.id || undefined,
        }
    })
    return handleRequest(request)
}

export const categoryUpdateApi = (categories) => {
    const url = `${categoriesUrl}/categories`
    const request = fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // passe our token as an "Authorization" header
            //Authorization: client.token.id || undefined,
        },
        body: JSON.stringify(categories)
    })

    return handleRequest(request)
}
