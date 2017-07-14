import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'

import {
  ARCHIVE_CREATING,
  ARCHIVE_REQUESTING,
} from './constants'

import {
  archiveCreateSuccess,
  archiveCreateError,
  archiveRequestSuccess,
  archiveRequestError,
} from './actions'

const archivesUrl = `${process.env.REACT_APP_API_URL}/api/archives`

// Nice little helper to deal with the response
// converting it to json, and handling errors
function handleRequest (request) {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function archiveCreateApi (client, archive) {
  const url = `${archivesUrl}/${client.id}/archives`
  const request = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // passes our token as an "Authorization" header in
      // every POST request.
      Authorization: client.token.id || undefined, // will throw an error if no login
    },
    body: JSON.stringify(archive),
  })

  return handleRequest(request)
}

function* archiveCreateFlow (action) {
  try {
    const { client, archive } = action
    const createdArchive = yield call(archiveCreateApi, client, archive)
    // creates the action with the format of
    // {
    //   type: ARCHIVE_CREATE_SUCCESS,
    //   archive,
    // }
    // Which we could do inline here, but again, consistency
    yield put(archiveCreateSuccess(createdArchive))
  } catch (error) {
    // same with error
    yield put(archiveCreateError(error))
  }
}

function archiveRequestApi (client) {
  const url = `${archivesUrl}/${client.id}/archives`
  const request = fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // passe our token as an "Authorization" header
      Authorization: client.token.id || undefined,
    },
  })

  return handleRequest(request)
}

function* archiveRequestFlow (action) {
  try {
    // grab the client from our action
    const { client } = action
    // call to our archiveRequestApi function with the client
    const archives = yield call(archiveRequestApi, client)
    // dispatch the action with our archives!
    yield put(archiveRequestSuccess(archives))
  } catch (error) {
    yield put(archiveRequestError(error))
  }
}

function* archivesWatcher () {
  // each of the below RECEIVES the action from the .. action
  yield [
    takeLatest(ARCHIVE_CREATING, archiveCreateFlow),
    takeLatest(ARCHIVE_REQUESTING, archiveRequestFlow),
  ]
}

export default archivesWatcher
