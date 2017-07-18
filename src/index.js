import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header } from './components'

import {
  checkIndexAuthorization
} from './lib/check-auth'

// Import all of our components
import Login from './login'
import Archives from './archives'
import Categories from './categories'

import './App.css'

// Import the index reducer and sagas
import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware()

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(IndexSagas)

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <div className='app'>
            <Header />
            <div className="App-body">
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route path="/archives" component={Archives} />
                    <Route path="/categories" component={Categories} />
                </Switch>
            </div>
        </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
