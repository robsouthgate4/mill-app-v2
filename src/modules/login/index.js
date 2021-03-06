import React, {Component, PropTypes} from 'react'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import history from '../../lib/history'

import Messages from '../../notifications/Messages'
import Errors from '../../notifications/Errors'

import {checkAuthorization} from '../../lib/check-auth'

import { loginRequest } from './actions'

class Login extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func,
        loginRequest: PropTypes.func,
        login: PropTypes.shape(
            {
                requesting: PropTypes.bool,
                messages: PropTypes.array,
                errors: PropTypes.array
            }
        )
    }

    componentWillMount() {

    }

    // Remember, Redux Form passes the form values to our handler
    // In this case it will be an object with `username` and `password`
    submit = (values) => {
        const { loginRequest } = this.props
        loginRequest(values)
    }

    render() {
        const {
            handleSubmit, // remember, Redux Form injects this into our props
            login: {
                requesting,
                successful,
                messages,
                errors
            }
        } = this.props

        return (
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit(this.submit)}>
                    <i className="mill-logo mill-icons_mill"></i>
                    <h2>A place to find work within The Mill</h2>
                    <label htmlFor="username">Email</label>
                    <Field
                        name="username"
                        type="text"
                        id="username"
                        className="email"
                        component="input"/>
                      <label htmlFor="password">Password</label>
                      <Field name="password" type="password" id="password" className="password" component="input"/>
                      <div className="login-button">
                          <button className="default-btn black-btn" action="submit">LOGIN</button>
                      </div>
                </form>
                <div className="auth-messages">
                    {/* As in the signup, we're just using the message and error helpers */}
                    {!requesting && !!errors.length && (<Errors message="Failure to login due to:" errors={errors}/>)}
                    {!requesting && !!messages.length && (<Messages messages={messages}/>)}
                    {requesting && <div>Logging in...</div>}
                    {/* {!requesting && !successful && (
                        <Link to="/signup">Need to Signup? Click Here »</Link>
                    )} */}
                </div>
            </div>
        )
    }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({login: state.login})

// make Redux state piece of `login` and our action `loginRequest`
// available in this.props within our component
const connected = connect(mapStateToProps, {loginRequest})(Login)

// in our Redux's state, this form will be available in 'form.login'
const formed = reduxForm({form: 'login'})(connected)

// Export our well formed login component
export default formed
