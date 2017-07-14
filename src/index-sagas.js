import LoginSaga from './login/sagas'
import ArchiveSaga from './archives/sagas'

export default function* IndexSaga () {
  yield [
    LoginSaga(),
    ArchiveSaga()
  ]
}
