import { call, put, takeLatest } from 'redux-saga/effects'

import {
    archiveCreateApi,
    archiveRequestApi,
    archiveUpdateApi,
    archiveRequestById  } from '../api/archiveApi'

import {
  ARCHIVE_CREATING,
  ARCHIVE_REQUESTING,
  ARCHIVE_REQUESTING_BY_ID,
  ARCHIVE_UPDATING
} from './constants'

import {
  archiveCreateSuccess,
  archiveCreateError,
  archiveRequestSuccess,
  archiveRequestByIdSuccess,
  archiveUpdateError,
  archiveUpdateSuccess,
  archiveRequestError,
} from './actions'

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

function* archiveRequestFlow (action) {
  try {
    const { client, page, id = null } = action
    const archives = yield call(archiveRequestApi, client, id, page)

    yield put(archiveRequestSuccess(archives))

  } catch (error) {
    yield put(archiveRequestError(error))
  }
}

function* archiveRequestByIdFlow (action) {
  try {

    const { client, id, page = 1 } = action
    const archive = yield call(archiveRequestApi, client, id, page)

    yield put(archiveRequestByIdSuccess(archive))

  } catch (error) {
    yield put(archiveRequestError(error))
  }
}

function* archiveUpdateFlow (action) {
    try {
        const { client, id, archive } = action
        const responseArchive = yield call(archiveUpdateApi, client, id, archive)

        console.log(responseArchive)

    } catch(error) {
        //yield put(archiveUpdateError(error))
    }
}

function* archivesWatcher () {
  yield [
    takeLatest(ARCHIVE_CREATING, archiveCreateFlow),
    takeLatest(ARCHIVE_REQUESTING, archiveRequestFlow),
    takeLatest(ARCHIVE_REQUESTING_BY_ID, archiveRequestByIdFlow),
    takeLatest(ARCHIVE_UPDATING, archiveUpdateFlow)
  ]
}

export default archivesWatcher
