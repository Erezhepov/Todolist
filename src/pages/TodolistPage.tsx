import React, {useEffect} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {getTodolistAC} from "../store/actionCreators/todoThunks";
import AddList from "../components/todo/AddList";
import TodoList from "../components/todo/TodoList";
import {ErrorFetch} from "../components/ErrorFetch";

const TodolistPage = () => {
    const todoState = useTypedSelector(state => state.todo)
    const dispatch: any = useDispatch()
    useEffect(() => {
        dispatch(getTodolistAC())
    }, []);
    if (todoState.error) return <ErrorFetch error={todoState.error}/>
    return (
        <div className={' ml-6 py-6 pr-6 flex gap-6 overflow-auto h-[600px] flex-1'}>
            {todoState.lists.map(list => <TodoList key={list.id} id={list.id} title={list.title} />)}
            <AddList />
        </div>
    );
};

export default TodolistPage;