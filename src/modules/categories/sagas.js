import { call, put, takeLatest } from 'redux-saga/effects'

import {
  CATEGORY_CREATING,
  CATEGORY_REQUESTING,
  CATEGORY_UPDATE_REQUESTING
} from './constants'

import {
    categoryRequestApi,
    categoryCreateApi,
    categoryUpdateApi
} from '../../api/categoryApi'

import {
  categoryCreateSuccess,
  categoryCreateError,
  categoryRequestSuccess,
  categoryRequestError,
  categoryUpdateSuccess,
  categoryUpdateError
} from './actions'

function* categoryCreateFlow (action) {
  try {
    const { client, category } = action
    const createdCategory = yield call(categoryCreateApi, client, category)

    yield put(categoryCreateSuccess(createdCategory))
  } catch (error) {
    // same with error
    yield put(categoryCreateError(error))
  }
}

function* categoryRequestFlow (action) {
  try {
    // grab the client from our action
    const { client } = action
    // call to our categoryRequestApi function with the client
    const categories = yield call(categoryRequestApi, client)
    // dispatch the action with our categories!
    yield put(categoryRequestSuccess(categories))
  } catch (error) {
    yield put(categoryRequestError(error))
  }
}

function* categoryUpdateFlow (action) {
  try {
    // grab the client from our action
    const { client, categories } = action
    // call to our categoryRequestApi function with the client
    const updatedCategories = yield call(categoryUpdateApi, categories)
    // dispatch the action with our categories!
    yield put(categoryUpdateSuccess(updatedCategories))
  } catch (error) {
    yield put(categoryUpdateError(error))
  }
}

function* categoriesWatcher () {
  // each of the below RECEIVES the action from the .. action
  yield [
    takeLatest(CATEGORY_CREATING, categoryCreateFlow),
    takeLatest(CATEGORY_REQUESTING, categoryRequestFlow),
    takeLatest(CATEGORY_UPDATE_REQUESTING, categoryUpdateFlow)
  ]
}

export default categoriesWatcher
