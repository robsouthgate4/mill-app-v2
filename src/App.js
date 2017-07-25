import React from 'react';
import history from './lib/history'
import { Provider } from 'react-redux'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
// Import all of our components
import Login from './modules/login'
import Archives from './modules/archives'
import Categories from './modules/categories'
import Header from './components/Header'
import { NotFound } from './components'
import CSSTransitionGroup from 'react-addons-css-transition-group';

import {checkAuthorization, checkIndexAuthorization} from './lib/check-auth'

const PrivateRoute = ({
    component: Component,
    ...rest
}) => (
    <Route {...rest} render={props => {
        const store = rest.store
        return checkAuthorization(store)
        ? (
            <div className='app'>
                <Header location={props.location}/>
                <div className="App-body">
                    <Component {...props}/>
                </div>
            </div>
        )
        : (<Redirect to={{
            pathname: '/login',
            state: {
                from: props.location
            }
        }}/>)
    }
}/>
)

export const App = (props) => {
    const { store } = props
    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                        <PrivateRoute exact store={store} location={location} path="/" component={Archives}></PrivateRoute>
                        <Route location={location} path="/login" component={Login}/>
                        <PrivateRoute store={store} location={location} path="/archives" component={Archives}></PrivateRoute>
                        <PrivateRoute store={store} location={location} path="/categories" component={Categories}></PrivateRoute>
                        <Route location={location} component={NotFound}></Route>
                </Switch>
            </Router>
        </Provider>

    );
}
