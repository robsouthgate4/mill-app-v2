import {handleRequest} from '../lib/handleRequest'

const archivesUrl = `${process.env.REACT_APP_API_URL}/api/archives`

export const archiveCreateApi = (client, archive) => {
    const url = `${archivesUrl}?token=${client.token}`
    let formData = new FormData()

    formData.append("archive", archive)
    const request = fetch(url, {
        method: 'POST',
        body: formData
    })
    return handleRequest(request)
}

export const archiveRequestApi = (client, page, limit) => {
    const url = `${archivesUrl}?page=${page}&max_per_page=${limit}&token=${client.token}`
    const request = fetch(url, {method: 'GET'})
    return handleRequest(request)
}

export const archiveRequestByIdApi = (client, id) => {
    const url = `${archivesUrl}/${id}?token=${client.token}`
    const request = fetch(url, {method: 'GET'})
    return handleRequest(request)
}

export const archiveUpdateApi = (client, archive, id) => {
    const url = `${archivesUrl}/${id}?token=${client.token}`

    const request = fetch(url, {
        method: 'PUT',
        body: JSON.stringify(archive)
    })

    return handleRequest(request)
}
