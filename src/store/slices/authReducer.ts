export const AUTH_LOADING = 'AUTH_LOADING'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR_DATA = 'AUTH_ERROR_DATA'
export const AUTH_DELETE = 'AUTH_DELETE'

export enum ResultCode {
    success = 0,
    error = 1
}
export interface IAuthState {
    loading: boolean
    error: null | string
    email: string | null
    id: number | null
    login: string | null
    message: string | null
}
export const initialState: IAuthState = {
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