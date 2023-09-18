export type ITodos = {
    items: ITask[]
    totalCount: number
    error: string | null
};
export interface ITodoState {
    loading: boolean
    error: null | string
    tasks: {
        [key: string] : ITodos
    }
    lists: IList[]
    message: null | string
}
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
export interface IList {
    title: string
    order: number
    id: string
    addedDATE: string
}