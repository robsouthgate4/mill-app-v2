import {handleRequest} from '../lib/handleRequest'

const archivesUrl = `${process.env.REACT_APP_API_URL}`

export const archiveCreateApi = (client, archive) => {
    const url = `${archivesUrl}/api/archives?token=${client.token}`
    let formData = new FormData()

    formData.append("archive", archive)
    const request = fetch(url, {
        method: 'POST',
        body: formData
    })
    return handleRequest(request)
}

export const archiveRequestApi = (client, id, page, limit) => {
    const url = !!id
        ? `${archivesUrl}/api/archives/${id}?token=${client.token}`
        : `${archivesUrl}/api/archives?page=${page}&max_page_size=${limit}&token=${client.token}`
    const request = fetch(url, {method: 'GET'})
    return handleRequest(request)
}

export const archiveUpdateApi = (client, id, archive) => {
    const url = `${archivesUrl}/api/archives/${id}`
    const request = fetch(url, {
        method: 'PUT',
        body: JSON.stringify(archive)
    })

    return handleRequest(request)
}
