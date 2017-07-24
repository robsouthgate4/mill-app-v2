import {
    CATEGORY_CREATING,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_ERROR,
    CATEGORY_REQUESTING,
    CATEGORY_REQUEST_SUCCESS,
    CATEGORY_REQUEST_ERROR,
    CATEGORY_UPDATE_ORDER,
    CATEGORY_UPDATE_REQUESTING,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_ERROR
} from './constants'

const initialState = {
    list: [],
    tempCategories: [],
    requesting: false,
    successful: false,
    messages: [],
    errors: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_CREATING:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: [
                    {
                        body: `Archive: ${action.category.name} being created...`,
                        time: new Date()
                    }
                ],
                errors: []
            }

            // On success include the new category into our list
        case CATEGORY_CREATE_SUCCESS:
            return {
                list: state.list.concat([action.category]),
                requesting: false,
                successful: true,
                messages: [
                    {
                        body: `Widget: ${action.category.name} awesomely created!`,
                        time: new Date()
                    }
                ],
                errors: []
            }

        case CATEGORY_CREATE_ERROR:
            return {
                ...state,
                requesting: false,
                successful: false,
                messages: [],
                errors: state.errors.concat([
                    {
                        body: action.error.toString(),
                        time: new Date()
                    }
                ])
            }

        case CATEGORY_REQUESTING:
            return {
                ...state, // ensure that we don't erase fetched ones
                requesting: true,
                successful: false,
                messages: [
                    {
                        body: 'Fetching categories...!',
                        time: new Date()
                    }
                ],
                errors: []
            }

        case CATEGORY_REQUEST_SUCCESS:
            return {
                ...state,
                list: action.categories, // replace with fresh list
                tempCategories: action.categories, // Always store as referece to previous order
                requesting: false,
                successful: true,
                messages: [
                    {
                        body: 'Categories fetched!',
                        time: new Date()
                    }
                ],
                errors: []
            }

        case CATEGORY_REQUEST_ERROR:
            return {
                ...state,
                requesting: false,
                successful: false,
                messages: [],
                errors: state.errors.concat[
                    {
                        body : action.error.toString(),
                        time : new Date()
                    }
                ]
            }

        case CATEGORY_UPDATE_REQUESTING:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: [
                    {
                        body: 'Updating categories...',
                        time: new Date()
                    }
                ],
                errors: []
            }

        case CATEGORY_UPDATE_SUCCESS:
            return {
                ...state,
                requesting: false,
                successful: true,
                messages: [
                    {
                        body: 'Updated categories successfully',
                        time: new Date()
                    }
                ],
                errors: []
            }

        case CATEGORY_UPDATE_ERROR:
            return {
                ...state,
                requesting: false,
                successful: false,
                messages: [],
                errors: state.errors.concat[
                    {
                        body : action.error.toString(),
                        time : new Date()
                    }
                ]
            }

        case CATEGORY_UPDATE_ORDER:
            return {
                ...state,
                requesting: false,
                successful: false,
                messages: [],
                tempCategories: action.categories,
                errors: []
            }

        default:
            return state
    }

}

export default reducer
