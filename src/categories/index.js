import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import { CategoryList } from '../components'
import { CategoryListEdit } from '../components'

// include our categoryRequest action
import {categoryCreate, categoryRequest} from './actions'

class Category extends Component {

    constructor(props) {
        super(props);
        this.fetchCategories()
    }

    fetchCategories = () => {

    }

    submit = (category) => {

    }

    update = () => {

    }

    render() {
        const fakeCategories = [
            {
                'name': 'category',
                'synced': true,
                'videosSynced': 100,
            },
            {
                'name': 'category',
                'synced': true,
                'videosSynced': 100,
            },
            {
                'name': 'category',
                'synced': true,
                'videosSynced': 100,
            },
            {
                'name': 'category',
                'synced': true,
                'videosSynced': 100,
            }
        ]
        return (
            <div className="categories">
                <Switch>
                    <Route exact path="/categories" render={(props) => <CategoryList categories={fakeCategories} />} />
                    <Route path="/categories/edit" render={(match) => <CategoryListEdit categories={fakeCategories} />} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const connected = connect(mapStateToProps)(Category)

export default connected
