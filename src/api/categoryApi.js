import {handleRequest} from '../lib/handleRequest'
import {handleApiErrors} from '../lib/api-errors'

const categoriesUrl = `${process.env.REACT_APP_API_URL}`

export const categoryCreateApi = (client, category) => {
    const url = `${categoriesUrl}`
    const request = fetch(url, {
        method: 'POST'
    })
    return handleRequest(request)
}

export const categoryRequestApi = (client) => {
    const url = `${categoriesUrl}/api/categories?token=${client.token}`
    const request = fetch(url, {
        method: 'GET'
    })
    return handleRequest(request)
}

export const categoryUpdateApi = (categories) => {
    const url = `${categoriesUrl}/categories`
    const request = fetch(url, {
        method: 'PUT',
        body: JSON.stringify(categories)
    })

    return handleRequest(request)
}
