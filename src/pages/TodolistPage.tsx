import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {getTodolistAC, reorderTodolistAC} from "../store/actionCreators/todoThunks";
import AddList from "../components/todo/AddList";
import TodoList from "../components/todo/TodoList";
import {ErrorFetch} from "../components/ErrorFetch";
import Loading from "../components/Loading";
import {IList} from "../store/reducers/todoReducer";

const TodolistPage = () => {
    const todoState = useTypedSelector(state => state.todo)
    const dispatch: any = useDispatch()
    const [currentList, setCurrentList] = useState<IList | null>(null)
    const [droppedList, setDroppedList] = useState<IList | null>(null)
    const [isChanged, setIsChanged] = useState(false)
    useEffect(() => {
        dispatch(getTodolistAC())
    }, [dispatch]);
    useEffect(() => {
        if (isChanged){
            const changeOrderList = () => {
                if (currentList && droppedList){
                    const lastDroppedIndex = todoState.lists.findIndex(x => x.id === droppedList.id)
                    if (currentList.order > droppedList.order){
                        if (lastDroppedIndex === todoState.lists.length - 1){
                            dispatch(reorderTodolistAC(currentList.id, null))
                        }else{
                            const newPlaceList = todoState.lists[lastDroppedIndex + 1]
                            dispatch(reorderTodolistAC(currentList.id, newPlaceList.id))
                        }
                    }
                    if (currentList.order < droppedList.order){
                        const newPlaceList = todoState.lists[lastDroppedIndex ]
                        dispatch(reorderTodolistAC(currentList.id, newPlaceList.id))
                    }
                }
                setIsChanged(false)
            }
            changeOrderList()
        }
    },
        // eslint-disable-next-line
        [isChanged]);
    if (todoState.error) return <ErrorFetch error={todoState.error}/>
    return (
        <>
            {todoState.loading && <Loading />}
            <div className={' ml-6 py-6 pr-6 flex gap-6 overflow-auto h-[100%] flex-1'}>
                    {todoState.lists.map(list => <TodoList isChanged={isChanged} droppedList={droppedList} setIsChanged={setIsChanged} setLastList={setDroppedList} setCurrentList={setCurrentList} currentList={currentList} list={list} key={list.id} id={list.id} title={list.title} />)}
                <AddList />
            </div>
        </>
    );
};

export default TodolistPage;