import React from 'react';
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {deleteList} from "../../store/slices/todo.actions";

interface IRemoveTodoListBtn {
    id: string
}

const RemoveTodoListBtn: React.FC<IRemoveTodoListBtn> = ({id}) => {
    const dispatch: Dispatch<any> = useDispatch()
    const deleteTodolist = () => {
        dispatch(deleteList(id))
    }
    return (
        <button className={'btn !w-[40px] !h-[36px] ml-[auto]'} onClick={deleteTodolist}>
            X
        </button>
    );
};

export default RemoveTodoListBtn;