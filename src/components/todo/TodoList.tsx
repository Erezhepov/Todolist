import React, {useEffect} from 'react';
import EditableValue from "./EditableValue";
import {ITask} from "../../store/reducers/todoReducer";
import Task from "./Task";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import RemoveTodoListBtn from "./RemoveTodoList";
import {getTodoTasksAC, renameTodolistAC} from "../../store/actionCreators/todoThunks";
import {useDispatch} from "react-redux";
import AddCard from "./AddCard";

interface ITodoList {
    title: string
    id: string
}

const TodoList: React.FC<ITodoList> = ({title, id}) => {
    const tasks = useTypedSelector(state => state.todo.tasks)

    const dispatch: any = useDispatch()
    const renameValue = (value: string) => {
        dispatch(renameTodolistAC(id, value))
    }
    useEffect(() => {
        dispatch(getTodoTasksAC(id))
    }, [id]);
    return (
        <div>
            <div className={'todolist border-2 p-[.7em] rounded w-[340px] flex flex-col justify-center '}>
                <div className={'flex justify-between'}>
                    <EditableValue renameValue={renameValue} value={title} />
                    <RemoveTodoListBtn id={id} />
                </div>
                <div className={'flex flex-col gap-[.5em] mt-2.5'}>
                    { tasks[id]?.items.map((t: ITask)  => <Task listId={id} task={t} key={t.id}/>) }
                </div>
                <AddCard id={id} />
            </div>
        </div>
    );
};

export default TodoList;