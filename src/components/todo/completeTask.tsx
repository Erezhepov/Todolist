import React from 'react';
import {useDispatch} from "react-redux";
// import {completeTodoTaskAC} from "../../store/actionCreators/todoThunks";

interface ICompleteTask {
    title: string
    listId: string
    taskId: string
}

const CompleteTask: React.FC<ICompleteTask> = ({listId, taskId, title}) => {
    const dispatch: any = useDispatch()
    const completeHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked
        // dispatch(completeTodoTaskAC(listId, taskId, title, isDone))
    }

    return (
        <input onClick={completeHandler} className={'cursor-pointer w-[20px] h-[20px] mr-[7px] bg-[#FED36A]'} type="checkbox"/>
    );
};

export default CompleteTask;