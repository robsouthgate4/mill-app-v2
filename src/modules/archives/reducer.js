import {
    ARCHIVE_CREATING,
    ARCHIVE_CREATE_SUCCESS,
    ARCHIVE_CREATE_ERROR,
    ARCHIVE_REQUESTING,
    ARCHIVE_REQUEST_SUCCESS,
    ARCHIVE_REQUEST_ERROR,
    ARCHIVE_REQUESTING_BY_ID,
    ARCHIVE_REQUEST_BY_ID_SUCCESS,
} from './constants'

const initialState = {
    list: [],
    archiveById: null,
    orderBy: 'title',
    orderDir: 'asc',
    page: 1,
    limit: 25,
    requesting: false,
    requestingById: false,
    successful: false,
    messages: [],
    errors: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ARCHIVE_CREATING:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: [
                    {
                        body: `Archive: ${action.archive.name} being created...`,
                        time: new Date()
                    }
                ],
                errors: []
            }

            // On success include the new archive into our list
        case ARCHIVE_CREATE_SUCCESS:
            return {
                ...state,
                list: state.list.concat([action.archive]),
                requesting: false,
                successful: true,
                messages: [
                    {
                        body: `Archive: ${action.archive.name} created!`,
                        time: new Date()
                    }
                ],
                errors: []
            }

        case ARCHIVE_CREATE_ERROR:
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

        case ARCHIVE_REQUESTING:
            return {
                ...state,
                requesting: true,
                successful: false,
                page: action.page,
                messages: [
                    {
                        body: 'Fetching archives...!',
                        time: new Date()
                    }
                ],
                errors: []
            }

        case ARCHIVE_REQUEST_SUCCESS:
            return {
                ...state,
                list: action.archives, // replace with fresh list
                requesting: false,
                successful: true,
                messages: [
                    {
                        body: 'Archives fetched!',
                        time: new Date()
                    }
                ],
                errors: []
            }

        case ARCHIVE_REQUEST_ERROR:
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

        case ARCHIVE_REQUESTING_BY_ID:
            return {
                ...state,
                requestingById: true,
                successful: false,
                messages: [
                    {
                        body: 'Fetching single archive',
                        time: new Date()
                    }
                ],
                errors: []
            }

        case ARCHIVE_REQUEST_BY_ID_SUCCESS:
            return {
                ...state,
                archiveById: action.archive,
                requestingById: false,
                successful: true,
                messages: [
                    {
                        body: 'Archive fetched!',
                        time: new Date()
                    }
                ],
                errors: []
            }

        default:
            return state
    }
}

export default reducer
