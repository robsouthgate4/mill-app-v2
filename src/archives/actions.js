import {
    ARCHIVE_CREATING,
    ARCHIVE_CREATE_SUCCESS,
    ARCHIVE_CREATE_ERROR,
    ARCHIVE_REQUESTING,
    ARCHIVE_REQUEST_SUCCESS,
    ARCHIVE_REQUEST_ERROR,
    ARCHIVE_REQUESTING_BY_ID,
    ARCHIVE_REQUEST_BY_ID_SUCCESS
} from './constants'

export const archiveCreate = (client, archive) => {
    return {type: ARCHIVE_CREATING, client, archive}
}

export const archiveCreateSuccess = (archive) => {
    return {type: ARCHIVE_CREATE_SUCCESS, archive}
}

export const archiveCreateError = (error) => {
    return {type: ARCHIVE_CREATE_ERROR, error}
}

export const archiveRequest = (client, id) => {
    return {type: ARCHIVE_REQUESTING, client, id}
}

export const archiveRequestById = (client, id) => {
    return {type: ARCHIVE_REQUESTING_BY_ID, client, id}
}

export const archiveRequestSuccess = (archives) => {
    return {type: ARCHIVE_REQUEST_SUCCESS, archives}
}

export const archiveRequestByIdSuccess = (archive) => {
    return {type: ARCHIVE_REQUEST_BY_ID_SUCCESS, archive}
}

export const archiveRequestError = (error) => {
    return {type: ARCHIVE_REQUEST_ERROR, error}
}
