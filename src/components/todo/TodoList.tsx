import React, {useEffect, useState} from 'react';
import EditableValue from "./EditableValue";
import {IList, ITask} from "../../store/reducers/todoReducer";
import Task from "./Task";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import RemoveTodoListBtn from "./RemoveTodoList";
import {
    getTodoTasksAC,
    renameTodolistAC,
    reorderTaskAC,
} from "../../store/actionCreators/todoThunks";
import {useDispatch} from "react-redux";
import AddCard from "./AddCard";
import SumOfTasks from "./SumOfTasks";


interface ITodoList {
    title: string
    id: string
    list: IList
    currentList: IList | null
    setCurrentList: (value: IList) => void
    setLastList: (value: IList) => void
    setIsChanged: (isChanged: boolean) => void
    droppedList: IList | null
}

const TodoList: React.FC<ITodoList> = ({title, id, list, currentList, setCurrentList, setLastList, setIsChanged, droppedList}) => {
    const todoState = useTypedSelector(state => state.todo)
    const tasks = useTypedSelector(state => state.todo.tasks)
    const dispatch: any = useDispatch()
    const [isMovedTask, setIsMovedTask] = useState(false)
    const [draggableTask, setDraggableTask] = useState(true)
    const [currentTask, setCurrentTask] = useState<ITask | null>(null)
    const [droppedTask, setDroppedTask] = useState<ITask | null>(null)
    const renameValue = (value: string) => {
        dispatch(renameTodolistAC(id, value))
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
    }
    const onDropHandler = (e: React.DragEvent<HTMLDivElement> | any, list: IList) => {
        if (e.target.classList.contains('todolist') || e.target.parentNode.classList.contains('todolist')){
            if (currentList?.order !== list.order){
                if (currentList?.order !== undefined && currentList?.order !== null){
                    setDraggableTask(true)
                    setLastList(list)
                    setIsChanged(true)
                }
            }
        }
        e.preventDefault()
    }
    const changeOrderTask = () => {
        if (currentList && currentTask && droppedList){
            if (droppedTask?.id !== undefined){
                const tasks = todoState.tasks[droppedList.id].items
                const lastDroppedIndex = tasks.findIndex(x => x.id === droppedTask.id)
                if (currentTask.order > droppedTask.order){
                    if (lastDroppedIndex === tasks.length - 1){
                        dispatch(reorderTaskAC(currentList.id, currentTask.id, null))
                    }else{
                        const newPlaceTask = tasks[lastDroppedIndex + 1]
                        dispatch(reorderTaskAC(currentList.id,  currentTask.id, newPlaceTask.id))
                    }
                }
                if (currentTask.order < droppedTask.order){
                    const newPlaceTask = tasks[lastDroppedIndex]
                    dispatch(reorderTaskAC(currentList.id, currentTask.id, newPlaceTask.id))
                }
            }
        }
        setIsMovedTask(false)
    }
    useEffect(() => {
        if (id){
            dispatch(getTodoTasksAC(id))
        }
    }, [id, dispatch]);
    useEffect(() => {
        changeOrderTask()
    }, [isMovedTask]);
    return (
            <div>
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
                        { tasks[id]?.items.map((t: ITask)  => <Task draggableTask={draggableTask} setIsChanged={setIsChanged} setIsMovedTask={setIsMovedTask} setCurrentTask={setCurrentTask} setDroppedTask={setDroppedTask} currentTask={currentTask} setLastList={setLastList} setCurrentList={setCurrentList} currentList={currentList}
                                                                    list={list} listName={title} listId={id} task={t} key={t.id}/>) }
                    </div>
                    <AddCard id={id} />
                </div>
            </div>
    );
};

export default TodoList;