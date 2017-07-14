import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

// include our categoryRequest action
import {categoryCreate, categoryRequest} from './actions'

class Category extends Component {

    constructor(props) {
        super(props);
    }

    fetchCategories = () => {

    }

    submit = (category) => {

    }

    update = () => {

    }

    render() {
        return (
            <div className="Categories">
                <h2>Hello from categories</h2>
            </div>
        )
    }
}

// Pull in both the Client and the Archives state
const mapStateToProps = state => ({})

// Make the Client and Archives available in the props as well
// as the categoryCreate() function
const connected = connect(mapStateToProps)(Category)
const formed = reduxForm({form: 'categories'})(connected)

export default formed
