import {
  CATEGORY_CREATING,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_ERROR,
  CATEGORY_REQUESTING,
  CATEGORY_REQUEST_SUCCESS,
  CATEGORY_REQUEST_ERROR,
} from './constants'

export const categoryCreate = function categoryCreate (client, category) {
  return {
    type: CATEGORY_CREATING,
    client,
    category,
  }
}

export const categoryCreateSuccess = function categoryCreateSuccess (category) {
  return {
    type: CATEGORY_CREATE_SUCCESS,
    category,
  }
}

export const categoryCreateError = function categoryCreateError (error) {
  return {
    type: CATEGORY_CREATE_ERROR,
    error,
  }
}

export const categoryRequest = function categoryRequest (client) {
  return {
    type: CATEGORY_REQUESTING,
    client,
  }
}

export const categoryRequestSuccess = function categoryRequestSuccess (categorys) {
  return {
    type: CATEGORY_REQUEST_SUCCESS,
    categorys,
  }
}

export const categoryRequestError = function categoryRequestError (error) {
  return {
    type: CATEGORY_REQUEST_ERROR,
    error,
  }
}
