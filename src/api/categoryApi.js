import {handleRequest} from '../lib/handleRequest'
import {handleApiErrors} from '../lib/api-errors'

const categoriesUrl = `${process.env.REACT_APP_API_URL}/api/categories`

export const categoryCreateApi = (client, category) => {
    const url = `${categoriesUrl}/?token=${client.token}`

    const categoryObj = {
            archive_count: 0,
            name: category,
            enabled: false
        }

    console.log(categoryObj)

    const request = fetch(url, {
        method: 'POST',
        body: JSON.stringify(categoryObj)
    })
    return handleRequest(request)
}

export const categoryDeleteApi = (client, id) => {
    const url = `${categoriesUrl}/${id}?token=${client.token}`
    const request = fetch(url, {
        method: 'DELETE'
    })
    return handleRequest(request)
}

export const categoryRequestApi = (client) => {
    const url = `${categoriesUrl}?token=${client.token}`
    const request = fetch(url, {
        method: 'GET'
    })
    return handleRequest(request)
}

export const categoryUpdateApi = (categories) => {
    const url = `${categoriesUrl}`
    const request = fetch(url, {
        method: 'PUT',
        body: JSON.stringify(categories)
    })

    return handleRequest(request)
}
