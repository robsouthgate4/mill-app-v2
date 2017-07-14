import {
  ARCHIVE_CREATING,
  ARCHIVE_CREATE_SUCCESS,
  ARCHIVE_CREATE_ERROR,
  ARCHIVE_REQUESTING,
  ARCHIVE_REQUEST_SUCCESS,
  ARCHIVE_REQUEST_ERROR,
} from './constants'

const initialState = {
  list: [],
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function archiveReducer (state = initialState, action) {
  switch (action.type) {
    case ARCHIVE_CREATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{
          body: `Archive: ${action.archive.name} being created...`,
          time: new Date(),
        }],
        errors: [],
      }

    // On success include the new archive into our list
    case ARCHIVE_CREATE_SUCCESS:
      return {
        list: state.list.concat([action.archive]),
        requesting: false,
        successful: true,
        messages: [{
          body: `Widget: ${action.archive.name} awesomely created!`,
          time: new Date(),
        }],
        errors: [],
      }

    case ARCHIVE_CREATE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case ARCHIVE_REQUESTING:
      return {
        ...state, // ensure that we don't erase fetched ones
        requesting: false,
        successful: true,
        messages: [{
          body: 'Fetching archives...!',
          time: new Date(),
        }],
        errors: [],
      }

    case ARCHIVE_REQUEST_SUCCESS:
      return {
        list: action.archives, // replace with fresh list
        requesting: false,
        successful: true,
        messages: [{
          body: 'Archives fetched!',
          time: new Date(),
        }],
        errors: [],
      }

    case ARCHIVE_REQUEST_ERROR:
      return {
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat[{
          body: action.error.toString(),
          time: new Date(),
        }],
      }

    default:
      return state
  }
}

export default reducer
