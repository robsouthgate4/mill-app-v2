import {call, put, takeLatest} from 'redux-saga/effects'

import {CATEGORY_CREATING, CATEGORY_DELETING, CATEGORY_REQUESTING, CATEGORY_UPDATING} from './constants'

import {categoryRequestApi, categoryCreateApi, categoryUpdateApi, categoryDeleteApi} from '../../api/categoryApi'

import {
    categoryCreateSuccess,
    categoryCreateError,
    categoryRequestSuccess,
    categoryRequestError,
    categoryUpdateSuccess,
    categoryUpdateError,
    categoryDeleteSuccess,
    categoryDeleteError
} from './actions'

function * categoryCreateFlow(action) {
    try {
        const {client, category} = action
        const createdCategory = yield call(categoryCreateApi, client, category)

        yield put(categoryCreateSuccess(createdCategory))
    } catch (error) {
        yield put(categoryCreateError(error))
    }
}

function * categoryDeleteFlow(action) {
    try {
        const {client, id} = action
        const updatedCategories = yield call(categoryDeleteApi, client, id)

        yield put(categoryDeleteSuccess(updatedCategories))
    } catch (error) {
        yield put(categoryDeleteError(error))
    }
}

function * categoryRequestFlow(action) {
    try {

        const {client} = action
        const categories = yield call(categoryRequestApi, client)

        yield put(categoryRequestSuccess(categories))
    } catch (error) {
        yield put(categoryRequestError(error))
    }
}

function * categoryUpdateFlow(action) {
    try {

        const {client, categories} = action
        const updatedCategories = yield call(categoryUpdateApi, categories)

        yield put(categoryUpdateSuccess(updatedCategories))
    } catch (error) {
        yield put(categoryUpdateError(error))
    }
}

function * categoriesWatcher() {
    yield[
        takeLatest(CATEGORY_CREATING, categoryCreateFlow),
        takeLatest(CATEGORY_REQUESTING, categoryRequestFlow),
        takeLatest(CATEGORY_UPDATING, categoryUpdateFlow),
        takeLatest(CATEGORY_DELETING, categoryDeleteFlow)
    ]
}

export default categoriesWatcher
