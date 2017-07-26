import { call, put, take } from 'redux-saga/effects'

import {
  archiveCreateSuccess,
  archiveCreateError,
  archiveRequestSuccess,
  archiveRequestByIdSuccess,
  archiveUpdateError,
  archiveUpdateSuccess,
  archiveRequestError,
  archiveUploadingFile,
  archiveUploadingFileSuccess,
  archiveUploadingFileError
} from './actions'

import { archiveRequestApi } from '../../api/archiveApi'

import { archiveRequestFlow } from './sagas'

test('archiveRequestFlow() should dispatch success action', () => {


});
