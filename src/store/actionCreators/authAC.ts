import {Dispatch} from "react";
import {instance} from "../../api/api";
import {
    ActionAuthSuccess,
    AUTH_DELETE,
    AUTH_ERROR,
    AUTH_ERROR_DATA,
    AUTH_LOADING,
    ResultCode,
    TActionsAuth
} from "../reducers/authReducer";
import {TInputs} from "../../pages/AuthPage";

interface IFetchData{
    data: any
    messages: string[]
    resultCode: ResultCode
}

export const fetchAuth = () => {
    return async (dispatch: Dispatch<TActionsAuth>) => {
        try {
            dispatch({type: AUTH_LOADING})
            const response = await instance.get('auth/me')
            const data = response.data
            if (data.resultCode === ResultCode.success){
                dispatch(ActionAuthSuccess(data.data))
            }
        }catch (e){
            dispatch({type: AUTH_ERROR, payload: 'Ошибка при авторизации'})
        }
    }
}



export const loginThunk = (props: TInputs) => {
    return async (dispatch: Dispatch<TActionsAuth | Function>) => {
        try {
            dispatch({type: AUTH_LOADING})
            const response = await instance.post('auth/login', {...props})
            const data: IFetchData = response.data
            if (data.resultCode === ResultCode.success){
                dispatch(fetchAuth())
            }
            if (data.resultCode === ResultCode.error){
                dispatch({type: AUTH_ERROR_DATA, payload: data.messages[0]})
            }
        }catch (e){
            dispatch({type: AUTH_ERROR, payload: 'Ошибка при логинизации'})
        }
    }
}

export const logoutThunk = () => {
    return async (dispatch: Dispatch<TActionsAuth>) => {
        try {
            dispatch({type: AUTH_LOADING})
            const response = await instance.delete('auth/login')
            const data: IFetchData = response.data
            if (data.resultCode === ResultCode.success){
                dispatch({type: AUTH_DELETE})
            }
        }catch (e){
            dispatch({type: AUTH_ERROR, payload: 'Ошибка при выхода'})
        }
    }
}