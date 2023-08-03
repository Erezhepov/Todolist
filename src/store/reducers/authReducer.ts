export const AUTH_LOADING = 'AUTH_LOADING'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR_DATA = 'AUTH_ERROR_DATA'
export const AUTH_DELETE = 'AUTH_DELETE'

export enum ResultCode {
    success = 0,
    error = 1
}
interface IAuthState {
    loading: boolean
    error: null | string
    email: string | null
    id: number | null
    login: string | null
    message: string | null
}
const initialState: IAuthState = {
    loading: false,
    error: null,
    email: '',
    login: '',
    id: null,
    message: ''
}

interface IActionAuthLoading {type: typeof AUTH_LOADING}
interface IActionAuthError {
    type: typeof AUTH_ERROR,
    payload: string
}
interface IAuthData {
    email: string | null
    id: number
    login: string
}
interface IActionAuthSuccess {
    type: typeof AUTH_SUCCESS
    payload: IAuthData
}
interface IActionAuthDelete {
    type: typeof AUTH_DELETE,
}
interface IActionAuthErrorData {
    type: typeof AUTH_ERROR_DATA,
    payload: string
}
export type TActionsAuth = IActionAuthLoading | IActionAuthError | IActionAuthSuccess | IActionAuthDelete | IActionAuthErrorData

export const AuthReducer = (state=initialState, action: TActionsAuth) => {
    switch (action.type){
        case AUTH_LOADING:
            return {...state, loading: true}
        case AUTH_ERROR:
            return {...state, loading: false, error: action.payload}
        case AUTH_SUCCESS:
            return {...state, loading: false, error: null, message: '', ...action.payload}
        case AUTH_ERROR_DATA:
            return {...state, loading: false, error: null, message: action.payload}
        case AUTH_DELETE:
            return {...state, loading: false, error: null, email: null, id: null, login: null, message: null}
        default:
            return state
    }
}

export const ACAuthSuccess = (data: IAuthData): IActionAuthSuccess => {
    return {type: AUTH_SUCCESS, payload: {...data}}
}