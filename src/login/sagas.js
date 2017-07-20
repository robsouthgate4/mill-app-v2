import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'

// We'll use this function to redirect to different routes based on cases
import { browserHistory } from 'react-router'

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
  browserHistory.push('/login')
}

function* loginFlow (email, password) {
  let token
  try {
    token = yield call(loginApi, email, password)

    yield put(setClient(token))

    yield put({ type: LOGIN_SUCCESS })

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
