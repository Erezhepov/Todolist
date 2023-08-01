import React from 'react';
import CheckBox from "../../UI/CheckBox";
import EditableValue from "./EditableValue";
import {ITask} from "../../store/reducers/todoReducer";

interface ICard {
    task: ITask
}

const Task: React.FC<ICard> = ({task}) => {
    return (
        <div className={'border-2 rounded p-[.4em]'}>
            <ul>
                <li className={'flex justify-between items-center'} >
                    <EditableValue value={task.title} />
                    <CheckBox />
                </li>
            </ul>
        </div>
    );
};

export default Task;