import React from 'react';
import CheckBox from "../../UI/CheckBox";
import EditableValue from "./EditableValue";
import {ITask} from "../../store/reducers/todoReducer";
import {useDispatch} from "react-redux";
import {deleteTodoTaskAC, renameTodoTaskAC} from "../../store/actionCreators/todoThunks";

interface ICard {
    task: ITask
    listId: string
}

const Task: React.FC<ICard> = ({task, listId}) => {
    const dispatch: any = useDispatch()
    const removeTask = () => {
        dispatch(deleteTodoTaskAC(listId, task.id))
    }
    const renameTask = (title: string) => {
        dispatch(renameTodoTaskAC(listId, task.id, title))
    }
    return (
        <div className={'border-2 rounded p-[.4em]'}>
            <ul className={'flex justify-between items-center'}>
                <li className={'flex justify-start gap-5 items-center'} >
                    <EditableValue renameValue={renameTask} value={task.title} />
                    <CheckBox />
                </li>
                <button onClick={removeTask}>X</button>
            </ul>
        </div>
    );
};

export default Task;