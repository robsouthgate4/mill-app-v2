import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import client from './client/reducer'
import archives from './archives/reducer'
import categories from './categories/reducer'
import login from './login/reducer'

const IndexReducer = combineReducers({
  client,
  login,
  form,
  archives,
  categories,
  routing: routerReducer
})

export default IndexReducer
