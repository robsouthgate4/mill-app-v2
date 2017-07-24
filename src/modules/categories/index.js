import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import Messages from '../../notifications/Messages'
import Errors from '../../notifications/Errors'

import { CategoryList } from '../../components'
import { CategoryListEdit } from '../../components'

// include our categoryRequest action
import {categoryCreate, categoryRequest} from './actions'

class Category extends Component {

    constructor(props) {
        super(props);
        this.fetchCategories()
    }

    fetchCategories = () => {
        const {client,  categoryRequest } = this.props
        categoryRequest(client)
    }

    render() {
        const { categories } = this.props
        return (
            <div className="categories">
                <Switch>
                    <Route exact path="/categories" render={(props) => <CategoryList categories={categories} />} />
                    <Route path="/categories/edit" render={(match) => <CategoryListEdit categories={categories} />} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.categories.list,
    client: state.client
})

const connected = withRouter(connect(
    mapStateToProps,
    {
        categoryRequest
    }
)(Category))

export default connected
