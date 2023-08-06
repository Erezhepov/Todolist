import {Dispatch} from "redux"
import {
    ACTodoDeleteList, ACTodoDeleteTask, ACTodoDescriptionTask,
    ACTodoRenameList, ACTodoRenameTask,
    ACTodoSuccessList,
    ACTodoSuccessTasks,
    IList,
    ITodos,
    TActionsTodo,
    TODO_ERROR,
    TODO_ERROR_DATA,
    TODO_LOADING
} from "../reducers/todoReducer";
import {instance} from "../../api/api";
import {IFetchData} from "./authThunks";
import {ResultCode} from "../reducers/authReducer";

export const getTodolistAC = () => {
    return async (dispatch: Dispatch<TActionsTodo>) => {
        try {
            dispatch({type: TODO_LOADING})
            const response = await instance.get('/todo-lists')
            const data: IList[] = response.data
            dispatch(ACTodoSuccessList(data.reverse()))
        }catch (e){
            dispatch({type: TODO_ERROR, payload: 'Ошибка при доставании todo листов'})
        }
    }
}
export const postTodolistAC = (title: string) => {
    return async (dispatch: Dispatch<TActionsTodo | any>) => {
        try {
            dispatch({type: TODO_LOADING})
            const response = await instance.post('/todo-lists', {title})
            const data: IFetchData = response.data
            if (data.resultCode === ResultCode.success){
                dispatch(getTodolistAC())
            }
            if (data.resultCode === ResultCode.error) dispatch({type: TODO_ERROR_DATA, payload: data.messages[0]})
        }catch (e){
            dispatch({type: TODO_ERROR, payload: 'Ошибка при создании todo листа'})
        }
    }
}
export const deleteTodolistAC = (id: string) => {
    return async (dispatch: Dispatch<TActionsTodo | any>) => {
        try {
            dispatch({type: TODO_LOADING})
            const response = await instance.delete(`/todo-lists/${id}`)
            const data: IFetchData = response.data
            if (data.resultCode === ResultCode.success){
                dispatch(ACTodoDeleteList(id))
            }
            if (data.resultCode === ResultCode.error) dispatch({type: TODO_ERROR_DATA, payload: data.messages[0]})
        }catch (e){
            dispatch({type: TODO_ERROR, payload: 'Ошибка при удалении todo листа'})
        }
    }
}
export const renameTodolistAC = (id: string, title: string) => {
    return async (dispatch: Dispatch<TActionsTodo>) => {
        try {
            dispatch({type: TODO_LOADING})
            const response = await instance.put(`/todo-lists/${id}`, {title})
            const data: IFetchData = response.data
            if (data.resultCode === ResultCode.success){
                dispatch(ACTodoRenameList(id, title))
            }
            if (data.resultCode === ResultCode.error) dispatch({type: TODO_ERROR_DATA, payload: data.messages[0]})
        }catch (e){
                    dispatch({type: TODO_ERROR, payload: 'Ошибка при изменении имени todo листа'})
        }
    }
}
export const getTodoTasksAC = (id: string) => {
    return async (dispatch: Dispatch<TActionsTodo>) => {
        try {
            dispatch({type: TODO_LOADING})
            const response = await instance.get(`/todo-lists/${id}/tasks`)
            const data: ITodos = response.data
            dispatch(ACTodoSuccessTasks(data, id))
        }catch (e){
            dispatch({type: TODO_ERROR, payload: 'Ошибка при получении задач из todo листа'})
        }
    }
}
export const postTodoTasksAC = (id: string, title: string) => {
    return async (dispatch: Dispatch<TActionsTodo | any>) => {
        try {
            dispatch({type: TODO_LOADING})
            const response = await instance.post(`/todo-lists/${id}/tasks`, {title})
            const data: IFetchData = response.data
            if (data.resultCode === ResultCode.success){
                dispatch(getTodoTasksAC(id))
            }
            if (data.resultCode === ResultCode.error) dispatch({type: TODO_ERROR_DATA, payload: data.messages[0]})

        }catch (e){
            dispatch({type: TODO_ERROR, payload: 'Ошибка при создании задачи'})
        }
    }
}
export const deleteTodoTaskAC = (listId: string, taskId: string) => {
    return async (dispatch: Dispatch<TActionsTodo>) => {
        try {
            dispatch({type: TODO_LOADING})
            const response = await instance.delete(`/todo-lists/${listId}/tasks/${taskId}`)
            const data: IFetchData = response.data
            if (data.resultCode === ResultCode.success){
                dispatch(ACTodoDeleteTask(listId, taskId))
            }
            if (data.resultCode === ResultCode.error) dispatch({type: TODO_ERROR_DATA, payload: data.messages[0]})

        }catch (e){
            dispatch({type: TODO_ERROR, payload: 'Ошибка при удалении задачи'})
        }
    }
}
export const renameTodoTaskAC = (listId: string, taskId: string, title: string) => {
    return async (dispatch: Dispatch<TActionsTodo>) => {
        try {
            dispatch({type: TODO_LOADING})
            const response = await instance.put(`/todo-lists/${listId}/tasks/${taskId}`, {title})
            const data: IFetchData = response.data
            if (data.resultCode === ResultCode.success){
                dispatch(ACTodoRenameTask(listId, taskId, title))
            }
            if (data.resultCode === ResultCode.error) dispatch({type: TODO_ERROR_DATA, payload: data.messages[0]})
        }catch (e){
            dispatch({type: TODO_ERROR, payload: 'Ошибка при изменении имени todo листа'})
        }
    }
}
export const putDescriptionTaskAC = (listId: string, taskId: string, title: string, description: string) => {
    return async (dispatch: Dispatch<TActionsTodo>) => {
        try {
            dispatch({type: TODO_LOADING})
            const response = await instance.put(`/todo-lists/${listId}/tasks/${taskId}`, {title, description})
            const data: IFetchData = response.data
            if (data.resultCode === ResultCode.success){
                dispatch(ACTodoDescriptionTask(listId, taskId, description))
            }
            if (data.resultCode === ResultCode.error) dispatch({type: TODO_ERROR_DATA, payload: data.messages[0]})
        }catch (e){
            dispatch({type: TODO_ERROR, payload: 'Ошибка при изменении описания'})
        }
    }
}
export const reorderTodolistAC = (id: string, putAfterItemId: string | null) => {
    return async (dispatch: Dispatch<TActionsTodo | any>) => {
        try {
            dispatch({type: TODO_LOADING})
            const response = await instance.put(`/todo-lists/${id}/reorder`, {putAfterItemId})
            const data: IFetchData = response.data
            if (data.resultCode === ResultCode.success){
                dispatch(getTodolistAC())
            }
            if (data.resultCode === ResultCode.error) dispatch({type: TODO_ERROR_DATA, payload: data.messages[0]})
        }catch (e){
            dispatch({type: TODO_ERROR, payload: 'Ошибка при изменении порядка todo листа'})
        }
    }
}
export const reorderTaskAC = (todolistId: string, taskId: string, putAfterItemId: string | null) => {
    debugger
    return async (dispatch: Dispatch<TActionsTodo | any>) => {
        try {
            dispatch({type: TODO_LOADING})
            const response = await instance.put(`/todo-lists/${todolistId}/tasks/${taskId}/reorder`, {putAfterItemId})
            const data: IFetchData = response.data
            console.log(data)
            if (data.resultCode === ResultCode.success){
                dispatch(getTodoTasksAC(todolistId))
            }
            if (data.resultCode === ResultCode.error) dispatch({type: TODO_ERROR_DATA, payload: data.messages[0]})
        }catch (e){
            dispatch({type: TODO_ERROR, payload: 'Ошибка при изменении порядка задач в todo листе'})
        }
    }
}