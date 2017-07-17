import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'

import {
  ARCHIVE_CREATING,
  ARCHIVE_REQUESTING,
  ARCHIVE_REQUESTING_BY_ID
} from './constants'

import {
  archiveCreateSuccess,
  archiveCreateError,
  archiveRequestSuccess,
  archiveRequestByIdSuccess,
  archiveRequestError,
} from './actions'

const archivesUrl = `${process.env.REACT_APP_LOCAL_URL}`

/* Helper function to deal with requests */
function handleRequest (request) {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function archiveCreateApi (client, archive) {
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

function* archiveCreateFlow (action) {
  try {
    const { client, archive } = action
    const createdArchive = yield call(archiveCreateApi, client, archive)

    yield put(archiveCreateSuccess(createdArchive))
  } catch (error) {
    // same with error
    yield put(archiveCreateError(error))
  }
}

function archiveRequestApi (client, id) {
  const url = !!id ? `${archivesUrl}/archives/${id}` : `${archivesUrl}/archives/`
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

function* archiveRequestFlow (action) {
  try {
    const { client} = action
    const archives = yield call(archiveRequestApi, client)

    yield put(archiveRequestSuccess(archives))

  } catch (error) {
    yield put(archiveRequestError(error))
  }
}

function* archiveRequesByIdFlow (action) {
  try {
    const { client, id } = action
    const archive = yield call(archiveRequestApi, client, id)

    yield put(archiveRequestByIdSuccess(archive))

  } catch (error) {
    yield put(archiveRequestError(error))
  }
}

function* archivesWatcher () {
  yield [
    takeLatest(ARCHIVE_CREATING, archiveCreateFlow),
    takeLatest(ARCHIVE_REQUESTING, archiveRequestFlow),
    takeLatest(ARCHIVE_REQUESTING_BY_ID, archiveRequesByIdFlow)
  ]
}

export default archivesWatcher
