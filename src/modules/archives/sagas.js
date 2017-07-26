import { call, put, takeLatest, delay } from 'redux-saga/effects'

import {
    archiveCreateApi,
    archiveRequestApi,
    archiveUpdateApi,
    archiveRequestByIdApi  } from '../../api/archiveApi'

import {
    getUploadCredentials,
    uploadFile } from '../../api/uploadApi'

import {
    categoryRequestApi } from '../../api/categoryApi'

import {
  ARCHIVE_CREATING,
  ARCHIVE_REQUESTING,
  ARCHIVE_REQUESTING_BY_ID,
  ARCHIVE_UPDATING,
  ARCHIVE_UPLOADING_FILE
} from './constants'

import {
  archiveCreateSuccess,
  archiveCreateError,
  archiveRequestSuccess,
  archiveRequestByIdSuccess,
  archiveUpdateError,
  archiveUpdateSuccess,
  archiveRequestError,
  archiveUploadingFileSuccess,
  archiveUploadingFileError
} from './actions'

function* archiveCreateFlow (action) {
  try {
    const { client, archive } = action
    const createdArchive = yield call(archiveCreateApi, client, archive)

    yield put(archiveCreateSuccess(createdArchive))
  } catch (error) {

    yield put(archiveCreateError(error))
  }
}

export function* archiveRequestFlow (action) {
  try {
    const { client, page, limit } = action
    const archives = yield call(archiveRequestApi, client, page, limit)

    yield put(archiveRequestSuccess(archives))

  } catch (error) {
    yield put(archiveRequestError(error))
  }
}

function* archiveRequestByIdFlow (action) {
  try {

    const { client, id } = action
    const archive = yield call(archiveRequestByIdApi, client, id)

    yield put(archiveRequestByIdSuccess(archive))

  } catch (error) {
    yield put(archiveRequestError(error))
  }
}

function* archiveUpdateFlow (action) {
    try {

        const { client, archive, id } = action
        const responseArchive = yield call(archiveUpdateApi, client, archive, id)
        yield put(archiveUpdateSuccess(responseArchive))

    } catch(error) {
        yield put(archiveUpdateError(error))
    }
}

function* archiveUploadFileFlow (action) {
    try {

        const { client, file, id } = action
        const credentialResponse = yield call(getUploadCredentials, client)
        const responseUpload = yield call(uploadFile, client, id, credentialResponse, file, 'thumbnails')

        yield put(archiveUploadingFileSuccess(responseUpload))
        //TODO: add action to update use_custom_thumbnail

    } catch ( error ) {
        yield put(archiveUploadingFileError(error))
    }
}

function* archivesWatcher () {
  yield [
    takeLatest(ARCHIVE_CREATING, archiveCreateFlow),
    takeLatest(ARCHIVE_REQUESTING, archiveRequestFlow),
    takeLatest(ARCHIVE_REQUESTING_BY_ID, archiveRequestByIdFlow),
    takeLatest(ARCHIVE_UPDATING, archiveUpdateFlow),
    takeLatest(ARCHIVE_UPLOADING_FILE, archiveUploadFileFlow)
  ]
}

export default archivesWatcher
