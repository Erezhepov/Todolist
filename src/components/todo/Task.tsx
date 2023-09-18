import React, {useState} from 'react';
import EditableValue from "./EditableValue";
import {useDispatch} from "react-redux";
import TaskModal from "./TaskModal";
import {deleteTask, renameTask} from "../../store/slices/todo.actions";
import {IList, ITask} from "../../models/todo.models";

interface ICard {
    task: ITask
    listId: string
    listName: string
    setCurrentTask: (task: ITask) => void
    setDroppedTask: (task: ITask) => void
    currentTask: ITask | null
    list: IList
    setCurrentList: (list: IList) => void
    currentList: IList | null
    setLastList: (list: IList) => void
    setIsChanged: (isChanged: boolean) => void
    setIsMovedTask: (isMoved: boolean) => void
    draggableTask: boolean
    setDraggableTask: (isDraggableTask :boolean) => void
}

const Task: React.FC<ICard> = ({task, listId, listName, setCurrentList, list, currentList, setLastList, setIsChanged, setCurrentTask, setIsMovedTask, setDroppedTask, draggableTask, setDraggableTask}) => {
    const dispatch: any = useDispatch()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const removeTask = () => {
        const data = {listId, taskId: task.id}
        dispatch(deleteTask(data))
    }
    const renameTaskHandler = (title: string) => {
        const data = {
            listId, taskId: task.id, title
        }
        dispatch(renameTask(data))
    }
    const modalHandler = () => {
        setIsOpenModal(true)
        setDraggableTask(false)
    }
    const dragStartHandler = (e:  React.DragEvent<HTMLDivElement>, list: IList, task: ITask) => {
        setIsChanged(false)
        setIsMovedTask(false)
        setCurrentList(list)
        setCurrentTask(task)
    }
    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.background = '#212832'
    }
    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.currentTarget.style.background = 'rgba(255,255,255,.1)'
    }
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        setIsMovedTask(true)
    }
    const onDropHandler = (e: React.DragEvent<HTMLDivElement>, list: IList, task: ITask) => {
        if (currentList?.order !== undefined && currentList?.order !== null){
            setLastList(list)
            setDroppedTask(task)
        }
        e.preventDefault()
    }
    return (
        <>
            <div
                onDragStart={(e) => dragStartHandler(e, list, task)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={e => dragOverHandler(e)}
                onDragEnd={e => dragEndHandler(e)}
                onDrop={e => onDropHandler(e, list, task)}
                draggable={draggableTask}
                title={'double click'} onDoubleClick={modalHandler} className={'task border-2 rounded p-[.4em] cursor-pointer'}>
                <ul className={'flex justify-between items-center'}>
                    <li className={'flex justify-start gap-5 items-center'} >
                        <EditableValue renameValue={renameTaskHandler} value={task.title} />
                    </li>
                    <button className={'btn !w-[40px] !h-[36px]'} onClick={removeTask}>X</button>
                </ul>
            </div>
            {isOpenModal && <TaskModal listId={listId} taskId={task.id} description={task.description} closeModal={setIsOpenModal} taskName={task.title} listName={listName} />}
        </>
    );
};

export default Task;