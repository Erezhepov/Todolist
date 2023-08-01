const TODO_LOADING = 'TODO_LOADING'
const TODO_ERROR = 'TODO_ERROR'
const TODO_SUCCESS = 'TODO_SUCCESS'

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
    error: string
};

interface ITodoState {
    loading: boolean
    error: null | string
    todos: any //incorrect
}
interface IActionTodoLoading {type: typeof TODO_LOADING}
interface IActionTodoError {
    type: typeof TODO_ERROR,
    payload: string
}
interface IActionTodoSuccess {
    type: typeof TODO_SUCCESS,
    payload: []
}
type TActionsTodo = IActionTodoLoading | IActionTodoError | IActionTodoSuccess

const initialState: ITodoState = {
    loading: false,
    error: null,
    todos: {
        items: [
            {
                description: 'Learn react at least 3 hours a day',
                title: 'React',
                completed: false,
                status: 0,
                priority: 0,
                startDate: '30.07.2023', //datetime
                deadline: '31.07.2023', //datetime
                id: '1',
                todoListId: '1',
                order: 1,
                addedDate: '30.07.2023' //datetime
            },
            {
                description: 'Play basketball at least 1 hour',
                title: 'Basketball',
                completed: false,
                status: 0,
                priority: 0,
                startDate: '30.07.2023', //datetime
                deadline: '31.07.2023', //datetime
                id: '2',
                todoListId: '1',
                order: 1,
                addedDate: '30.07.2023' //datetime
            }
        ],
        totalCount: 1,
        error: []
    },
}

export const TodoReducer = (state=initialState, action: TActionsTodo) => {
    switch (action.type){
        case TODO_LOADING:
            return {...state, loading: true}
        case TODO_ERROR:
            return {...state, loading: false, error: action.payload}
        case TODO_SUCCESS:
            return {...state, loading: false, error: null, todos: action.payload}
        default:
            return state
    }
}