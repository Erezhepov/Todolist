import React from 'react';
import {ITask} from "../../models/todo.models";

interface ISumOfTasks {
    items: ITask[]
}

const SumOfTasks: React.FC<ISumOfTasks> = ({items}) => {
    return (
        <div className={'border-2 rounded px-2 py-2] h-[28px] flex items-center justify-center text-[15px] gap-1'}>
            <span>{items?.length }</span> {items?.length > 1 ? <span> tasks</span> : <span>task</span>}
        </div>
    );
};

export default SumOfTasks;