import React, {useEffect, useState} from 'react';
import EditableValue from "./EditableValue";
import Task from "./Task";
import {useAppSelector} from "../../hooks/hooks";
import RemoveTodoListBtn from "./RemoveTodoList";
import {useDispatch} from "react-redux";
import AddCard from "./AddCard";
import SumOfTasks from "./SumOfTasks";
import {getTasks, renameList, reorderTask} from "../../store/slices/todo.actions";
import {IList, ITask} from "../../models/todo.models";
import {ErrorFetch} from "../ErrorFetch";


interface ITodoList {
    title: string
    id: string
    list: IList
    currentList: IList | null
    setCurrentList: (value: IList) => void
    setLastList: (value: IList) => void
    setIsChanged: (isChanged: boolean) => void
    droppedList: IList | null
    isChanged: boolean
}

const TodoList: React.FC<ITodoList> = ({title, id, list, currentList, setCurrentList, setLastList, setIsChanged, droppedList, isChanged}) => {
    const todoState = useAppSelector(state => state.todo)
    const tasks = useAppSelector(state => state.todo.tasks)
    const dispatch: any = useDispatch()
    const [isMovedTask, setIsMovedTask] = useState(false)
    const [draggableTask, setDraggableTask] = useState(true)
    const [currentTask, setCurrentTask] = useState<ITask | null>(null)
    const [droppedTask, setDroppedTask] = useState<ITask | null>(null)
    const renameValue = (title: string) => {
        const data = {id, title}
        dispatch(renameList(data))
    }
    const dragStartHandler = (e: React.DragEvent | any, list: IList) => {
        if (e.target.classList.contains('todolist')){
            setDraggableTask(false)
            setCurrentList(list)
        }
    }
    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.background = '#212832'
    }
    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.background = '#3f4b5b'
        e.preventDefault()
    }
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.background = '#212832'
        setIsChanged(false)
        setIsMovedTask(true)
        setDraggableTask(true)

    }
    const onDropHandler = (e: React.DragEvent<HTMLDivElement> | any, list: IList) => {
        if (e.target.classList.contains('todolist') || e.target.parentNode.classList.contains('todolist')) {
            e.currentTarget.style.background = '#212832'
            if (currentList !== list){
                if (currentList?.order !== list.order && currentList?.order !== undefined && currentList?.order !== null){
                    if (!isMovedTask){
                        setDraggableTask(true)
                        setLastList(list)
                        setIsChanged(true)
                    }
                }
            }
        }
        e.preventDefault()
    }
    useEffect(() => {
        if (id){
            dispatch(getTasks(id))
        }
    }, [id, dispatch]);
    useEffect(() => {
        if (isMovedTask){
            const changeOrderTask = () => {
                if (currentList && currentTask && droppedList){
                    if (droppedTask?.id !== undefined){
                        const tasks = todoState.tasks[droppedList.id].items
                        const lastDroppedIndex = tasks.findIndex(x => x.id === droppedTask.id)
                        if (currentTask.order > droppedTask.order){
                            if (lastDroppedIndex === tasks.length - 1){
                                dispatch(reorderTask({listId: currentList.id, taskId: currentTask.id, putAfterItemId: null}))
                            }else{
                                const newPlaceTask = tasks[lastDroppedIndex + 1]
                                dispatch(reorderTask({listId: currentList.id,  taskId: currentTask.id, putAfterItemId: newPlaceTask.id}))
                            }
                        }
                        if (currentTask.order < droppedTask.order){
                            const newPlaceTask = tasks[lastDroppedIndex]
                            dispatch(reorderTask({listId: currentList.id, taskId: currentTask.id, putAfterItemId: newPlaceTask.id}))
                        }
                    }
                }
                setIsMovedTask(false)
            }
            changeOrderTask()
        }
    },
        // eslint-disable-next-line
        [isMovedTask]);

    if (todoState.error) return <div>{<ErrorFetch error={todoState.error} />}</div>
    return (
            <div className={'card-wrapper'}>
                <div onDragStart={(e) => dragStartHandler(e, list)}
                     onDragLeave={(e) => dragLeaveHandler(e)}
                     onDragOver={e => dragOverHandler(e)}
                     onDragEnd={e => dragEndHandler(e)}
                     onDrop={e => onDropHandler(e, list)}
                     draggable={true} className={'todolist cursor-grab bg-primary todolist border-2 p-[.7em] rounded w-[340px] flex flex-col justify-center '}>
                    <div className={'flex justify-start items-center gap-6 px-[.4em]'}>
                        <EditableValue renameValue={renameValue} value={title} />
                        <SumOfTasks items={tasks[id]?.items} />
                        <RemoveTodoListBtn id={id} />
                    </div>
                    <div className={'flex flex-col gap-[.5em] mt-2.5'}>
                        { tasks[id]?.items?.map((t: ITask)  => <Task setDraggableTask={setDraggableTask} draggableTask={draggableTask} setIsChanged={setIsChanged} setIsMovedTask={setIsMovedTask} setCurrentTask={setCurrentTask} setDroppedTask={setDroppedTask} currentTask={currentTask} setLastList={setLastList} setCurrentList={setCurrentList} currentList={currentList}
                                                                    list={list} listName={title} listId={id} task={t} key={t.id}/>) }
                    </div>
                    <AddCard id={id} />
                </div>
            </div>
    );
};

export default TodoList;