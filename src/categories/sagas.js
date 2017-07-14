import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'

import {
  CATEGORY_CREATING,
  CATEGORY_REQUESTING,
} from './constants'

import {
  categoryCreateSuccess,
  categoryCreateError,
  categoryRequestSuccess,
  categoryRequestError,
} from './actions'

const categoriesUrl = `${process.env.REACT_APP_API_URL}/api/categories`

// Nice little helper to deal with the response
// converting it to json, and handling errors
function handleRequest (request) {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function categoryCreateApi (client, category) {
  const url = `${categoriesUrl}/${client.id}/categories`
  const request = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // passes our token as an "Authorization" header in
      // every POST request.
      Authorization: client.token.id || undefined, // will throw an error if no login
    },
    body: JSON.stringify(category),
  })

  return handleRequest(request)
}

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

function categoryRequestApi (client) {
  const url = `${categoriesUrl}/${client.id}/categories`
  const request = fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // passe our token as an "Authorization" header
      Authorization: client.token.id || undefined,
    },
  })

  return handleRequest(request)
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

function* categoriesWatcher () {
  // each of the below RECEIVES the action from the .. action
  yield [
    takeLatest(CATEGORY_CREATING, categoryCreateFlow),
    takeLatest(CATEGORY_REQUESTING, categoryRequestFlow),
  ]
}

export default categoriesWatcher
