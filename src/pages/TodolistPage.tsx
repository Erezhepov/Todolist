import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../hooks/hooks";
import {useDispatch} from "react-redux";
import AddList from "../components/todo/AddList";
import TodoList from "../components/todo/TodoList";
import {ErrorFetch} from "../components/ErrorFetch";
import Loading from "../components/Loading";
import {getLists, reorderList} from "../store/slices/todo.actions";
import {IList} from "../models/todo.models";
import {apiAuth} from "../store/slices/apiAuth";

const TodolistPage = () => {
    const todoState = useAppSelector(state => state.todo)
    const dispatch: any = useDispatch()
    const [currentList, setCurrentList] = useState<IList | null>(null)
    const [droppedList, setDroppedList] = useState<IList | null>(null)
    const [isChanged, setIsChanged] = useState(false)
    const {data} = apiAuth.useGetAuthQuery(null)
    useEffect(() => {
        if (data?.data.login){
            dispatch(getLists())
        }
    }, [dispatch, data?.data.login]);
    useEffect(() => {
        if (isChanged){
            const changeOrderList = () => {
                if (currentList && droppedList){
                    const lastDroppedIndex = todoState.lists.findIndex(x => x.id === droppedList.id)
                    if (currentList.order > droppedList.order){
                        if (lastDroppedIndex === todoState.lists.length - 1){
                            dispatch(reorderList({id: currentList.id, putAfterItemId: null}))
                        }else{
                            const newPlaceList = todoState.lists[lastDroppedIndex + 1]
                            dispatch(reorderList({id: currentList.id, putAfterItemId: newPlaceList.id}))
                        }
                    }
                    if (currentList.order < droppedList.order){
                        const newPlaceList = todoState.lists[lastDroppedIndex ]
                        dispatch(reorderList({id: currentList.id, putAfterItemId: newPlaceList.id}))
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
            {todoState.error && <div>{todoState.error}</div>}
            <div className={' ml-6 py-6 pr-6 flex gap-6 overflow-auto h-[100%] flex-1'}>
                    {todoState.lists.map(list => <TodoList isChanged={isChanged} droppedList={droppedList} setIsChanged={setIsChanged} setLastList={setDroppedList} setCurrentList={setCurrentList} currentList={currentList} list={list} key={list.id} id={list.id} title={list.title} />)}
                <AddList />
            </div>
        </>
    );
};

export default TodolistPage;