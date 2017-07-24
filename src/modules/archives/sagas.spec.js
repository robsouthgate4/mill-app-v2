import { call, put } from 'redux-saga/effects'
import { archiveRequest } from './actions'

test('archiveRequestFlow() should dispatch success action', () => {
    const action = {
        client: {
            id: 1,
            token: 1234
        },
        page: 1,
        limit: 25
    }
    const generator = archiveRequest(action)

    // Check that Saga asks to call the API
    expect(
        generator.next().value
    ).to.be.eql(
        call(api.login, action)
    )

    // Check that Saga reacts correctly to the failure
    expect(
        generator.throw({
            error: 'user not found'
        }).value
        ).to.be.eql(
            put({
                type: 'LOGIN_FAIL',
                payload: { error: 'user not found' }
            })
    )
});
