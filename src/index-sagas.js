import LoginSaga from './modules/login/sagas'
import ArchiveSaga from './modules/archives/sagas'
import CategorySaga from './modules/categories/sagas'

export default function* IndexSaga () {
  yield [
    LoginSaga(),
    ArchiveSaga(),
    CategorySaga()
  ]
}
