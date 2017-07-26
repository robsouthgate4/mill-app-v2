import {
    CATEGORY_CREATING,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_ERROR,
    CATEGORY_REQUESTING,
    CATEGORY_REQUEST_SUCCESS,
    CATEGORY_REQUEST_ERROR,
    CATEGORY_UPDATE_ORDER,
    CATEGORY_UPDATING,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_ERROR,
    CATEGORY_DELETING,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_ERROR
} from './constants'

export const categoryCreate = (client, category) => {
    console.log(category)
    return {type: CATEGORY_CREATING, client, category}
}

export const categoryCreateSuccess = (client, category) => {
    return {type: CATEGORY_CREATE_SUCCESS, category}
}

export const categoryCreateError = error => {
    return {type: CATEGORY_CREATE_ERROR, error}
}

export const categoryRequest = client => {
    return {type: CATEGORY_REQUESTING, client}
}

export const categoryRequestSuccess = categories => {
    return {type: CATEGORY_REQUEST_SUCCESS, categories}
}

export const categoryRequestError = error => {
    return {type: CATEGORY_REQUEST_ERROR, error}
}

export const categoryUpdateRequest = (client, id, category) => {
    return {type: CATEGORY_UPDATING, client, category}
}

export const categoryUpdateSuccess = categories => {
    return {type: CATEGORY_UPDATE_SUCCESS, categories}
}

export const categoryUpdateError = error => {
    return {type: CATEGORY_UPDATE_ERROR, error}
}

export const categoryUpdateOrder = categories => {
    return {type: CATEGORY_UPDATE_ORDER, categories}
}

export const categoryDeleteRequest = (client, id) => {
    return {type: CATEGORY_DELETING, client, id}
}

export const categoryDeleteSuccess = categories => {
    return {type: CATEGORY_DELETE_SUCCESS, categories}
}

export const categoryDeleteError = error => {
    return {type: CATEGORY_DELETE_ERROR, error}
}
