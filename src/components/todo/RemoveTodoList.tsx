import React from 'react';
import {useDispatch} from "react-redux";
import {deleteTodolistAC} from "../../store/actionCreators/todoThunks";
import {Dispatch} from "redux";

interface IRemoveTodoListBtn {
    id: string
}

const RemoveTodoListBtn: React.FC<IRemoveTodoListBtn> = ({id}) => {
    const dispatch: Dispatch<any> = useDispatch()
    const deleteTodolist = () => {
        dispatch(deleteTodolistAC(id))
    }
    return (
        <button className={'btn !w-[40px] !h-[36px] ml-[auto]'} onClick={deleteTodolist}>
            X
        </button>
    );
};

export default RemoveTodoListBtn;