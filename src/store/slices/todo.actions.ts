import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../../api/api";
import {getErrorData} from "./todo.slice";
import {ITodos} from "../../models/todo.models";
import {IFetchData} from "../../models/auth.models";

export enum ResultCode {
    success = 0,
    error = 1
}
export interface IList {
    title: string
    order: number
    id: string
    addedDATE: string
}
interface IGetTasksSuccess {
    data: ITodos
    id: string
}

export const getTasks = createAsyncThunk<IGetTasksSuccess, string, {rejectValue: string | null}>('todo/getTasks',
    async (id, {rejectWithValue}) => {
        try {
            const response = await instance.get(`/todo-lists/${id}/tasks`)
            const data: ITodos = response.data
            return {data, id}
        }catch (e){
            return rejectWithValue('Ошибка при получении задач из todo листа')
        }
    })

interface IPostArgs {
    id: string
    title: string
}

export const postTask = createAsyncThunk('todo/postTask',
    async (data: IPostArgs, {rejectWithValue, dispatch}) => {
        const {id, title} = data
        try {
            const response = await instance.post(`/todo-lists/${id}/tasks`, {title})
            const data: IFetchData = response.data
            if (data.resultCode === ResultCode.success) dispatch(getTasks(id))
            else if (data.resultCode === ResultCode.error) dispatch(getErrorData(data.messages[0]))
        }catch (e){
            return rejectWithValue('Ошибка при создании задачи')
        }
    })

export const getLists = createAsyncThunk<IList[], void ,{rejectValue: string | null}>('todo/getLists',
    async (_, {rejectWithValue}) => {
    try {
        const response = await instance.get(`/todo-lists`)
        const data = response.data
        return data ? data : null
    }catch (e){
        return rejectWithValue('Ошибка при получении todo листов')
    }
})

interface IPostList extends IFetchData {
    data: {
        item: IList
    }
}
export const postList = createAsyncThunk('todo/postList',
    async (title: string, {rejectWithValue, dispatch}) => {
    try {
        const response = await instance.post(`/todo-lists`, {title})
        const data: IPostList = response.data
        if (data.resultCode === ResultCode.success) dispatch(getLists())
        else if (data.resultCode === ResultCode.error) dispatch(getErrorData(data.messages[0]))
    }catch (e){
        return rejectWithValue('Ошибка при создании todo листа')
    }
})

export const deleteList = createAsyncThunk<string, string, {rejectValue: string, dispatch: any}>('todo/deleteList',
    async (id, {rejectWithValue, dispatch}) => {
    try {
        const response = await instance.delete(`/todo-lists/${id}`)
        const data = response.data
        if (data.resultCode === ResultCode.success) return id
        else if (data.resultCode === ResultCode.error) return dispatch(getErrorData(data.messages[0]))
    }catch (e){
        return rejectWithValue('Ошибка при удалении todo листа')
    }
})

interface IReceivedDataRenameList {
    id: string
    title: string
}

export const renameList = createAsyncThunk('todo/renameList',
    async (receivedData: IReceivedDataRenameList, {rejectWithValue ,dispatch}) => {
    try {
        const {id, title} = receivedData
        const response = await instance.put(`/todo-lists/${id}`, {title})
        const data: IFetchData = response.data
        // if (data.resultCode === ResultCode.success)
        if (data.resultCode === ResultCode.error) dispatch(getErrorData(data.messages[0]))
    }catch (e){
        return rejectWithValue('Ошибка при изменении имени todo листа')
    }
})

interface IReceivedDataDeleteTask {
    listId: string
    taskId: string
}
export const deleteTask = createAsyncThunk('todo/deleteTask',
    async (receivedData: IReceivedDataDeleteTask, {dispatch, rejectWithValue}) => {
    try {
        const {listId, taskId} = receivedData
        const response = await instance.delete(`/todo-lists/${listId}/tasks/${taskId}`)
        const data: IFetchData = response.data
        if (data.resultCode === ResultCode.success) dispatch(getTasks(listId))
        else if (data.resultCode === ResultCode.error) dispatch(getErrorData(data.messages[0]))
    }catch (e){
        return rejectWithValue('Ошибка при удалении задачи')
    }
})

interface IReceivedDataRenameTask extends IReceivedDataDeleteTask{
    title: string
}
export const renameTask = createAsyncThunk('todo/renameTask',
    async (receivedData: IReceivedDataRenameTask, {rejectWithValue ,dispatch}) => {
        try {
            const {title, listId, taskId} = receivedData
            const response = await instance.put(`/todo-lists/${listId}/tasks/${taskId}`, {title})
            const data: IFetchData = response.data
            // if (data.resultCode === ResultCode.success) dispatch(getTasks(listId))
            if (data.resultCode === ResultCode.error) dispatch(getErrorData(data.messages[0]))
        }catch (e){
            return rejectWithValue('Ошибка при изменении имени задачи')
        }
    })


interface IReceivedDataDescriptionTask extends IReceivedDataDeleteTask{
    value: string
    taskName: string
}
export const putDescriptionTask = createAsyncThunk('todo/putDescriptionTask',
    async (receivedData: IReceivedDataDescriptionTask, {rejectWithValue, dispatch}) => {
    try {
        const {listId, taskId, value, taskName} = receivedData
        const response = await instance.put(`/todo-lists/${listId}/tasks/${taskId}`, {title: taskName, description: value})
        const data: IFetchData = response.data
        // if (data.resultCode === ResultCode.success) dispatch(getTasks(listId))
        if (data.resultCode === ResultCode.error) dispatch(getErrorData(data.messages[0]))
    }catch (e){
        return rejectWithValue('Ошибка при изменении описания')
    }

})

interface IReceivedDataReorderList {
    id: string
    putAfterItemId: string | null
}
export const reorderList = createAsyncThunk('todo/reorderList',
    async (receivedData: IReceivedDataReorderList, {rejectWithValue, dispatch}) => {
    try {
        const {id, putAfterItemId} = receivedData
        const response = await instance.put(`/todo-lists/${id}/reorder`, {putAfterItemId})
        const data: IFetchData = response.data
        if (data.resultCode === ResultCode.success) dispatch(getLists())
        else if (data.resultCode === ResultCode.error) dispatch(getErrorData(data.messages[0]))
    }catch (e){
        return rejectWithValue('Ошибка при изменении порядка todo листа')
    }

})

export interface IReceivedDataReorderTask {
    listId: string
    taskId: string
    putAfterItemId: string | null
}
export const reorderTask = createAsyncThunk('todo/reorderTask',
    async (receivedData: IReceivedDataReorderTask, {rejectWithValue, dispatch}) => {
        try {
            const {listId, taskId, putAfterItemId} = receivedData
            const response = await instance.put(`/todo-lists/${listId}/tasks/${taskId}/reorder`, {putAfterItemId})
            const data: IFetchData = response.data
            if (data.resultCode === ResultCode.success) dispatch(getTasks(listId))
            else if (data.resultCode === ResultCode.error) dispatch(getErrorData(data.messages[0]))
        }catch (e){
            return rejectWithValue('Ошибка при изменении порядка задач в todo листе')
        }

    })