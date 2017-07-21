import React from 'react';
import history from './lib/history'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
// Import all of our components
import Login from './login'
import Archives from './archives'
import Categories from './categories'
import {Header} from './components'

import {checkAuthorization} from './lib/check-auth'

const PrivateRoute = ({
    component: Component,
    ...rest
}) => (
    <Route {...rest} render={props => (checkAuthorization()
        ? (<Component {...props}/>)
        : (<Redirect to={{
            pathname: '/login',
            state: {
                from: props.location
            }
        }}/>))}/>
)

export const App = (props) => {
    return (
        <Router history={history}>
            <div className='app'>
                <Header/>
                <div className="App-body">
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <PrivateRoute path="/archives" component={Archives}></PrivateRoute>
                        <PrivateRoute path="/categories" component={Categories}></PrivateRoute>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}
