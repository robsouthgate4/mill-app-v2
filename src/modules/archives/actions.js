import {
    ARCHIVE_CREATING,
    ARCHIVE_CREATE_SUCCESS,
    ARCHIVE_CREATE_ERROR,
    ARCHIVE_REQUESTING,
    ARCHIVE_REQUEST_SUCCESS,
    ARCHIVE_REQUEST_ERROR,
    ARCHIVE_REQUESTING_BY_ID,
    ARCHIVE_REQUEST_BY_ID_SUCCESS,
    ARCHIVE_UPDATE_SUCCESS,
    ARCHIVE_UPDATE_ERROR,
    ARCHIVE_UPLOADING_FILE,
    ARCHIVE_UPLOAD_FILE_SUCCESS,
    ARCHIVE_UPLOAD_FILE_ERROR,
} from './constants'

export const archiveCreate = (client, archive) => {
    return {type: ARCHIVE_CREATING, client, archive}
}

export const archiveCreateSuccess = archive => {
    return {type: ARCHIVE_CREATE_SUCCESS, archive}
}

export const archiveCreateError = error => {
    return {type: ARCHIVE_CREATE_ERROR, error}
}

export const archiveRequest = (client, page, limit) => {
    return {type: ARCHIVE_REQUESTING, client, page, limit}
}

export const archiveUpdate = (client, archive, id) => {
    return {type: ARCHIVE_UPLOADING_FILE, client, archive, id}
}

export const archiveUpdateSuccess = (archive, id) => {
    return {type: ARCHIVE_UPLOAD_FILE_SUCCESS, archive, id}
}

export const archiveUpdateError = error => {
    return {type: ARCHIVE_UPLOAD_FILE_ERROR, error}
}

export const archiveUploadingFile = (client, file, id) => {
    return {type: ARCHIVE_UPLOADING_FILE, client, file, id}
}

export const archiveUploadingFileSuccess = file => {
    return {type: ARCHIVE_UPLOAD_FILE_SUCCESS, file}
}

export const archiveUploadingFileError = error => {
    return {type: ARCHIVE_UPLOAD_FILE_ERROR, error}
}

export const archiveRequestById = (client, id) => {
    return {type: ARCHIVE_REQUESTING_BY_ID, client, id}
}

export const archiveRequestSuccess = archives => {
    return {type: ARCHIVE_REQUEST_SUCCESS, archives}
}

export const archiveRequestByIdSuccess = archive => {
    return {type: ARCHIVE_REQUEST_BY_ID_SUCCESS, archive}
}

export const archiveRequestError = error => {
    return {type: ARCHIVE_REQUEST_ERROR, error}
}
