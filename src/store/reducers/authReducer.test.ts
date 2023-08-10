import {ACAuthSuccess, AUTH_DELETE, AuthReducer, IActionAuthDelete, IAuthState, TActionsAuth} from "./authReducer";

let state: IAuthState

describe('authReducer', () => {
    test('auth success', () => {
        state = {
            loading: false,
            error: null,
            email: '',
            login: '',
            id: null,
            message: ''
        }
        const action = ACAuthSuccess({email: 'm.erezhepofff@gmail.com', id: 1, login: 'me1rlan'})

        const result = AuthReducer(state, action)

        expect(result.id).toBe(1)
        expect(result.login).toBe('me1rlan')
        expect(result.email).toBe('m.erezhepofff@gmail.com')
    })
    test('auth log out', () => {
        state = {
            loading: false,
            error: null,
            email: 'm.erezhepofff@gmail.com',
            login: 'me1rlan',
            id: 1,
            message: ''
        }
        const action: IActionAuthDelete = {type: AUTH_DELETE}
        const response = AuthReducer(state, action)

        expect(response.email).toBeNull()
        expect(response.login).toBeNull()
        expect(response.id).toBeNull()
    })
})