import {ResultCode} from "../store/slices/authReducer";

export interface IAuthData {
    email: string | null
    login: string | null
    id: number | null
}
export interface IFetchData{
    data: any
    messages: string[]
    resultCode: ResultCode
}