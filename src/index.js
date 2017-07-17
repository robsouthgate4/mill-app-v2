import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
//import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { ArchiveDetailEdit, Header } from './components'
import ArchiveDetail from './components/ArchiveDetail'

import {
  checkIndexAuthorization,
  checkWidgetAuthorization,
} from './lib/check-auth'

// Import all of our components
import App from './App'
import Login from './login'
import Archives from './archives'
import Categories from './categories'
import './index.css'

// Import the index reducer and sagas
import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware()

// Redux DevTools - completely optional, but this is necessary for it to
// work properly with redux saga.  Otherwise you'd just do:
//
// const store = createStore(
//   IndexReducer,
//   applyMiddleware(sagaMiddleware)
// )

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
)

// Begin our Index Saga
sagaMiddleware.run(IndexSagas)

//const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <div className='app'>
            <Header />
            <div className="App-body">
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/archives" component={Archives} />
                    <Route exact path="/archives/:id" component={ArchiveDetail} />
                    <Route exact path="/archives/:id/edit" component={ArchiveDetail} />
                    <Route exact path="/categories" component={Categories} />
                </Switch>
            </div>
        </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
