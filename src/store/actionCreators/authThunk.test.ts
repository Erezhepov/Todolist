import axios from 'axios'
import {AUTH_ERROR_DATA, AUTH_LOADING} from "../slices/authReducer";
import {apiAuth} from "../slices/apiAuth";

jest.mock('axios')
const axiosMock = axios as jest.Mocked<typeof axios>

describe('authThunk', () => {
    let response: any
    let dispatch: any
    let thunk: any
    beforeEach(() => {
        thunk = apiAuth.useGetAuthQuery(null)
        response = {
            data: {
                resultCode: 0,
                data: {email: 'v.erezhepoff@gmail.com', id: 1, login: 'me1rlan'}
            }
        }
        dispatch = jest.fn()
    })

    test('fetchAuth dispatch called times', async () => {
        await thunk(dispatch)
        expect(dispatch).toBeCalledTimes(2)
    })
    test('fetchAuth success', async () => {
        axiosMock.get.mockReturnValue(response)
        await thunk(dispatch)
        expect(dispatch).toHaveBeenNthCalledWith(1, {type: AUTH_LOADING})
        // expect(dispatch).toHaveBeenNthCalledWith(2, ACAuthSuccess(response.data.data))
    })
    test('fetchAuth error data', async () => {
        response = {
            data: {
                resultCode: 1,
                data: {email: 'v.erezhepoff@gmail.com', id: 1, login: 'me1rlan'}
            }
        }
        axiosMock.get.mockReturnValue(response)
        await thunk(dispatch)
        expect(dispatch).toHaveBeenNthCalledWith(1, {type: AUTH_LOADING})
        expect(dispatch).toHaveBeenNthCalledWith(2, {type: AUTH_ERROR_DATA, payload: ''})
    })
})
