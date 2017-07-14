import {
  ARCHIVE_CREATING,
  ARCHIVE_CREATE_SUCCESS,
  ARCHIVE_CREATE_ERROR,
  ARCHIVE_REQUESTING,
  ARCHIVE_REQUEST_SUCCESS,
  ARCHIVE_REQUEST_ERROR,
} from './constants'

export const archiveCreate = function archiveCreate (client, archive) {
  return {
    type: ARCHIVE_CREATING,
    client,
    archive,
  }
}

export const archiveCreateSuccess = function archiveCreateSuccess (archive) {
  return {
    type: ARCHIVE_CREATE_SUCCESS,
    archive,
  }
}

export const archiveCreateError = function archiveCreateError (error) {
  return {
    type: ARCHIVE_CREATE_ERROR,
    error,
  }
}

export const archiveRequest = function archiveRequest (client) {
  return {
    type: ARCHIVE_REQUESTING,
    client,
  }
}

export const archiveRequestSuccess = function archiveRequestSuccess (archives) {
  return {
    type: ARCHIVE_REQUEST_SUCCESS,
    archives,
  }
}

export const archiveRequestError = function archiveRequestError (error) {
  return {
    type: ARCHIVE_REQUEST_ERROR,
    error,
  }
}
