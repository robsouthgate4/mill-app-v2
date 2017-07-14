import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from './client/reducer'
import archives from './archives/reducer'
import login from './login/reducer'

const IndexReducer = combineReducers({
  client,
  login,
  form,
  archives
})

export default IndexReducer
