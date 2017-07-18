import {handleRequest} from '../lib/handleRequest'

const archivesUrl = `${process.env.REACT_APP_LOCAL_URL}`

export const archiveCreateApi = (client, archive) => {
  const url = `${archivesUrl}/archives`
  const request = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // passes our token as an "Authorization" header in
      // every POST request.
      //Authorization: client.token.id || undefined, // will throw an error if no login
    },
    body: JSON.stringify(archive),
  })

  return handleRequest(request)
}

export const archiveRequestApi = (client, id, page) => {
  const url = !!id ? `${archivesUrl}/archives/${id}` : `${archivesUrl}/archives?_page=${page}&_limit=25`
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

export const archiveUpdateApi = (client, id, archive) => {
    const url = `${archivesUrl}/archives/${id}`
    const request = fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // passes our token as an "Authorization" header in
            // every POST request.
            //Authorization: client.token.id || undefined, // will throw an error if no login
        },
        body: JSON.stringify(archive)
    })

    return handleRequest(request)
}
