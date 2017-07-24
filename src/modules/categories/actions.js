import {
  CATEGORY_CREATING,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_ERROR,
  CATEGORY_REQUESTING,
  CATEGORY_REQUEST_SUCCESS,
  CATEGORY_REQUEST_ERROR,
  CATEGORY_UPDATE_ORDER,
  CATEGORY_UPDATE_REQUESTING,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_ERROR
} from './constants'

export const categoryCreate = (client, category) => {
  return {
    type: CATEGORY_CREATING,
    client,
    category
  }
}

export const categoryCreateSuccess = category => {
  return {
    type: CATEGORY_CREATE_SUCCESS,
    category
  }
}

export const categoryCreateError = error => {
  return {
    type: CATEGORY_CREATE_ERROR,
    error
  }
}

export const categoryRequest = client => {
  return {
    type: CATEGORY_REQUESTING,
    client
  }
}

export const categoryRequestSuccess = categories => {
  return {
    type: CATEGORY_REQUEST_SUCCESS,
    categories
  }
}

export const categoryUpdateRequest = categories => {
    return {
      type: CATEGORY_UPDATE_REQUESTING,
      categories
    }
}

export const categoryUpdateSuccess = categories => {
    return {
      type: CATEGORY_UPDATE_SUCCESS,
      categories
    }
}

export const categoryUpdateError = error => {
    return {
      type: CATEGORY_UPDATE_ERROR,
      error
    }
}

export const categoryUpdateOrder = categories => {
    return {
      type: CATEGORY_UPDATE_ORDER,
      categories
    }
}

export const categoryRequestError = error => {
  return {
    type: CATEGORY_REQUEST_ERROR,
    error
  }
}
