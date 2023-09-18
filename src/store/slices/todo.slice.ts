import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deleteList, getLists, getTasks} from "./todo.actions";
import {ITodoState} from "../../models/todo.models";

const initialState: ITodoState = {
    loading: false,
    error: '',
    tasks: {},
    message: null,
    lists: []
}
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        getErrorData: (state, {payload}: PayloadAction<string>) => {
            state.message = payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getTasks.pending, state => {
            state.loading = true
            state.error = null
        })
        .addCase(getTasks.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload ? payload : ''
        })
        .addCase(getTasks.fulfilled, (state, {payload}) => {
            state.loading = false
            state.error = null
            const id = payload.id
            const newTask = {
                [id] : {
                    items: [...payload.data.items.reverse()],
                    totalCount: payload.data.totalCount,
                    error: null
                }
            }
            state.tasks = {...state.tasks, ...newTask}
        })
        .addCase(getLists.pending, state => {
            state.loading = true
            state.error = null
        })
        .addCase(getLists.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload ? payload : null
        })
        .addCase(getLists.fulfilled, (state, {payload}) => {
            state.loading = false
            state.error = null
            state.lists = payload.reverse()
        })
        .addCase(deleteList.fulfilled, (state, {payload}) => {
            state.loading = false
            state.error = null
            state.lists = state.lists.filter(list => list.id !== payload)
        })
        .addCase(deleteList.pending, state => {
            state.loading = true
            state.error = null
            })
        .addCase(deleteList.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload ? payload: null
            state.lists = []
        })
    }
})

export const {getErrorData} = todoSlice.actions
export const {reducer} = todoSlice