import LoginSaga from './login/sagas'
import ArchiveSaga from './archives/sagas'
import CategorySaga from './categories/sagas'

export default function* IndexSaga () {
  yield [
    LoginSaga(),
    ArchiveSaga(),
    CategorySaga()
  ]
}
