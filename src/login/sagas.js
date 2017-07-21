import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import history from '../lib/history'

// We'll use this function to redirect to different routes based on cases
import { withRouter } from 'react-router-dom'

import { loginApi } from '../api/loginApi'

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


function* logout () {
  // dispatches the CLIENT_UNSET action
  yield put(unsetClient())
  // remove our token
  localStorage.removeItem('token')
  // redirect to the /login screen
  history.push('/login')
}

function* loginFlow (username, password) {
  let token
  try {

    token = yield call(loginApi, username, password)

    const tokenVal = token.token;

    yield put(setClient(tokenVal))
    yield put({ type: LOGIN_SUCCESS })

    localStorage.setItem('token', JSON.stringify(tokenVal))

    yield call(history.push, '/archives')

  } catch (error) {
    // error? send it to redux
    yield put({ type: LOGIN_ERROR, error })
  } finally {

    if (yield cancelled()) {
      yield call(history.push, '/login')
    }
  }

  // return the token for health and wealth
  return token
}

// Our watcher (saga).  It will watch for many things.
function* loginWatcher () {

  while (true) {

    const { username, password } = yield take(LOGIN_REQUESTING)
    const task = yield fork(loginFlow, username, password)
    const action = yield take([CLIENT_UNSET, LOGIN_ERROR])

    if (action.type === CLIENT_UNSET) yield cancel(task)

    yield call(logout)
  }
}

export default loginWatcher
