import React from 'react';
import Task from '../components/todo/Task';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {ITask} from "../store/reducers/todoReducer";
import EditableValue from "../components/todo/EditableValue";

const TodolistPage = () => {
    const tasks = useTypedSelector(state => state.todo.todos.items)
    return (
        <div className={'container py-6'}>

            <div className={'todolist border-2 p-[.7em] rounded w-[340px] flex flex-col justify-center '}>
                <EditableValue value={'Title'} />
                <div className={'flex flex-col gap-[.5em] mt-2.5'}>
                    { tasks.map((t: ITask)  => <Task task={t} key={t.id}/>) }
                </div>
            </div>
        </div>
    );
};

export default TodolistPage;