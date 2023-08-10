export const TODO_LOADING = 'TODO_LOADING'
export const TODO_ERROR = 'TODO_ERROR'
export const TODO_SUCCESS_TASKS = 'TODO_SUCCESS_TASK'
export const TODO_SUCCESS_LIST = 'TODO_SUCCESS_LIST'
export const TODO_CREATE_LIST = 'TODO_CREATE_LIST'
export const TODO_ERROR_DATA = 'TODO_ERROR_DATA'
export const TODO_RENAME_TODOLIST = 'TODO_RENAME_TODOLIST'
export const TODO_RENAME_TASK = 'TODO_RENAME_TASK'
export const TODO_DELETE_LIST = 'TODO_DELETE_LIST'
export const TODO_DELETE_TASK = 'TODO_DELETE_TASK'
export const TODO_DESCRIPTION_TASK = 'TODO_DESCRIPTION_TASK'

export interface ITask {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string //datetime
    deadline: string //datetime
    id: string
    todoListId: string
    order: number
    addedDate: string //datetime
}
export type ITodos = {
    items: ITask[]
    totalCount: number
    error: string | null
};

export interface IList {
    title: string
    order: number
    id: string
    addedDATE: string
}

interface ITodoState {
    loading: boolean
    error: null | string
    tasks: {
        [key: string] : ITodos
    }
    lists: IList[]
    message: null | string
}
interface IActionTodoLoading {type: typeof TODO_LOADING}
interface IActionTodoError {
    type: typeof TODO_ERROR,
    payload: string
}
interface IActionTodoSuccessTasks {
    type: typeof TODO_SUCCESS_TASKS,
    payload: {
        listId: string
        tasks: ITodos
    }
}
interface IActionTodoSuccessList {
    type: typeof TODO_SUCCESS_LIST,
    payload: IList[]
}
interface IActionTodoCreateList {
    type: typeof TODO_CREATE_LIST,
    payload: IList
}
interface IActionTodoErrorData {
    type: typeof TODO_ERROR_DATA,
    payload: string
}
interface IActionTodoDeleteList {
    type: typeof TODO_DELETE_LIST,
    payload: string
}
interface IActionTodoDeleteTask {
    type: typeof TODO_DELETE_TASK,
    payload: {
        listId: string
        taskId: string
    }
}
interface IActionTodolistRename {
    type: typeof TODO_RENAME_TODOLIST,
    payload: {
        id: string
        title: string
    }
}
interface IActionTodoTaskRename {
    type: typeof TODO_RENAME_TASK,
    payload: {
        listId: string
        taskId: string
        title: string
    }
}
interface IActionTodoTaskDescription {
    type: typeof TODO_DESCRIPTION_TASK,
    payload: {
        listId: string
        taskId: string
        description: string
    }
}

export type TActionsTodo = IActionTodoLoading | IActionTodoError | IActionTodoSuccessTasks
    | IActionTodoSuccessList | IActionTodoErrorData | IActionTodolistRename | IActionTodoDeleteList
    | IActionTodoDeleteTask | IActionTodoTaskRename | IActionTodoTaskDescription
    | IActionTodoCreateList

const initialState: ITodoState = {
    loading: false,
    error: null,
    tasks: {},
    message: null,
    lists: []
}

export const TodoReducer = (state=initialState, action: TActionsTodo) => {
    switch (action.type){
        case TODO_LOADING:
            return {...state, loading: true}
        case TODO_ERROR:
            return {...state, loading: false, error: action.payload}
        case TODO_ERROR_DATA:
            return {...state, loading: false, error: null, message: action.payload}
        case TODO_SUCCESS_TASKS:
            const id = action.payload.listId
            const newTask = {
                [id] : {
                    items: [...action.payload.tasks.items.reverse()],
                    totalCount: action.payload.tasks.totalCount,
                    error: null
                }
            }
            return {...state, loading: false, error: null, tasks: {...state.tasks, ...newTask} }
        case TODO_SUCCESS_LIST:
            return {...state, loading: false, error: null, lists: action.payload}
        case TODO_CREATE_LIST:
            return {...state, loading: false, error: null, lists: [...state.lists, action.payload]}
        case TODO_RENAME_TODOLIST:
            const updatedLists = state.lists.map(list => {
                if (list.id === action.payload.id){
                    list.title = action.payload.title
                }
                return list
            })
            return {...state, loading: false, error: null, lists: updatedLists}
        case TODO_RENAME_TASK:
            const todolistId = action.payload.listId
            const updatedTaskItems = [...state.tasks[todolistId].items]
            updatedTaskItems.map(t => {
                if (t.id === action.payload.taskId){
                    t.title = action.payload.title
                }
                return t
            })
            const updatedTasks = {
                [todolistId] : {...state.tasks[todolistId], error: null, items: updatedTaskItems}
            }
            return {...state, loading: false, error: null, tasks: {...state.tasks, ...updatedTasks}}
        case TODO_DELETE_LIST:
            const changedLists = state.lists.filter(list => list.id !== action.payload)
            return {...state, loading: false, error: null, lists: changedLists}
        case TODO_DELETE_TASK:
            const listId = action.payload.listId
            const changedTaskItems = state.tasks[listId].items.filter(task => {
                const payload = action.payload
                if (task.todoListId !== payload.listId || task.id !== payload.taskId){
                    return task
                }else{
                    return false
                }
            })
            const updatedTask = {
                [listId] : {totalCount: state.tasks[action.payload.listId].totalCount - 1, error: null, items: changedTaskItems}
            }
            return {...state, loading: false, error: null, tasks: {...state.tasks, ...updatedTask}}
        case TODO_DESCRIPTION_TASK:
            const idList = action.payload.listId
            const itemsOfTask = [...state.tasks[idList].items]
            itemsOfTask.map(t => {
                if (t.id === action.payload.taskId){
                    t.description = action.payload.description
                }
                return t
            })
            const changedTask = {
                [idList] : {...state.tasks[idList] ,error: null, items: itemsOfTask}
            }
            return {...state, loading: false, error: null, tasks: {...state.tasks, ...changedTask}}
        default:
            return state
    }
}

export const ACTodoSuccessList = (lists: IList[]): IActionTodoSuccessList => {
    return {type: TODO_SUCCESS_LIST, payload: lists}
}
export const ACTodoDeleteList = (id: string): IActionTodoDeleteList => {
    return {type: TODO_DELETE_LIST, payload: id}
}
export const ACTodoCreateList = (list: IList): IActionTodoCreateList => {
    return {type: TODO_CREATE_LIST, payload: list}
}
export const ACTodoRenameList = (id: string, title: string): IActionTodolistRename => {
    return {type: TODO_RENAME_TODOLIST, payload: {id, title}}
}
export const ACTodoRenameTask = (listId: string, taskId: string, title: string): IActionTodoTaskRename => {
    return {type: TODO_RENAME_TASK, payload: {listId, taskId, title}}
}
export const ACTodoDescriptionTask = (listId: string, taskId: string, description: string): IActionTodoTaskDescription => {
    return {type: TODO_DESCRIPTION_TASK, payload: {listId, taskId, description}}
}
export const ACTodoSuccessTasks = (tasks: ITodos, listId: string): IActionTodoSuccessTasks => {
    return {type: TODO_SUCCESS_TASKS, payload: {tasks, listId}}
}
export const ACTodoDeleteTask = (listId: string, taskId: string): IActionTodoDeleteTask  => {
    return {type: TODO_DELETE_TASK, payload: {listId, taskId}}
}