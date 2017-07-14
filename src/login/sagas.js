import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'

// We'll use this function to redirect to different routes based on cases
import { browserHistory } from 'react-router'

// Helper for api errors
import { handleApiErrors } from '../lib/api-errors'

// Our login constants
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants'

// So that we can modify our Client piece of state
import {
  setClient,
  unsetClient,
} from '../client/actions'

import {
  CLIENT_UNSET,
} from '../client/constants'

const loginUrl = `${process.env.REACT_APP_API_URL}/api/Clients/login`

function loginApi (email, password) {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* logout () {
  // dispatches the CLIENT_UNSET action
  yield put(unsetClient())

  // remove our token
  localStorage.removeItem('token')

  // redirect to the /login screen
  browserHistory.push('/login')
}

function* loginFlow (email, password) {
  let token
  try {
    // try to call to our loginApi() function.  Redux Saga
    // will pause here until we either are successful or
    // receive an error
    token = yield call(loginApi, email, password)

    // inform Redux to set our client token, this is non blocking so...
    yield put(setClient(token))

    // .. also inform redux that our login was successful
    yield put({ type: LOGIN_SUCCESS })
    // set a stringified version of our token to localstorage on our domain
    localStorage.setItem('token', JSON.stringify(token))

    browserHistory.push('/archives')
  } catch (error) {
    // error? send it to redux
    yield put({ type: LOGIN_ERROR, error })
  } finally {

    if (yield cancelled()) {
      browserHistory.push('/login')
    }
  }

  // return the token for health and wealth
  return token
}

// Our watcher (saga).  It will watch for many things.
function* loginWatcher () {

  while (true) {

    const { email, password } = yield take(LOGIN_REQUESTING)
    const task = yield fork(loginFlow, email, password)
    const action = yield take([CLIENT_UNSET, LOGIN_ERROR])

    if (action.type === CLIENT_UNSET) yield cancel(task)

    yield call(logout)
  }
}

export default loginWatcher
