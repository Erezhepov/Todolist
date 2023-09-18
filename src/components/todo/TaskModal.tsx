import React from 'react';
import {useDispatch} from "react-redux";
import EditableDescription from "./EditableDescription";
import CloseModalBtn from "./CloseModalBtn";
import {putDescriptionTask} from "../../store/slices/todo.actions";

interface ITaskModal {
    closeModal: (isOpen: boolean) => void
    taskName: string
    listName: string
    description: string
    listId: string
    taskId: string
}

const TaskModal: React.FC<ITaskModal> = ({taskName, listName, closeModal, description, listId, taskId}) => {
    const dispatch: any = useDispatch()
    const closeHandler = (e: React.MouseEvent<HTMLDivElement>) =>  e.currentTarget === e.target && closeModal(false)
    const changeDescription = (value: string) => {
        const data = {
            listId, taskId, taskName, value
        }
        if (value.trim() !== description?.trim()){
            dispatch(putDescriptionTask(data))
        }
    }
    return (
        <div onClick={closeHandler} className={'wrapper bg-[rgba(255,255,255,.3)] absolute w-[100%] h-[100%] left-0 top-0'}>
            <div className={'container rounded p-4 absolute top-[9em] left-[50%] translate-x-[-50%] z-10 w-[640px] border-2 bg-[#212832]'}>
                <p className={'text-[1.4em]'}>{taskName}</p>
                <p><span>in list "{listName}"</span></p>
                <div className={'mt-10'}></div>
                <p className={'font-bold'}>Description</p>
                <EditableDescription value={description || 'empty'} renameValue={changeDescription} />
                <CloseModalBtn closeModal={closeModal} />
            </div>
        </div>
    );
};

export default TaskModal;