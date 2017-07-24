import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import client from './modules/client/reducer'
import archives from './modules/archives/reducer'
import categories from './modules/categories/reducer'
import login from './modules/login/reducer'

const IndexReducer = combineReducers({
  client,
  login,
  form,
  archives,
  categories,
  routing: routerReducer
})

export default IndexReducer
