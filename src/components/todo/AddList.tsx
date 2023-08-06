import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {postTodolistAC} from "../../store/actionCreators/todoThunks";

const AddList: React.FC<any> = () => {
    const [title, setTitle] = useState('')
    const dispatch: any = useDispatch()
    const [isActive, setIsActive] = useState(false)
    const postTodolist = () => {
        if (title.length > 0){
            setIsActive(false)
            dispatch(postTodolistAC(title))
            setTitle('')
        }
    }
    const activeHandler = () => {
        setIsActive(true)
    }
    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const postWithEnter = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title.length > 0){
            setIsActive(false)
            dispatch(postTodolistAC(title))
            setTitle('')
        }
    }
    return (
        <div className={'flex flex-col gap-3  min-w-[240px]'}>
            { isActive ? <>
                <input placeholder={'Enter list title...'} autoFocus onKeyPress={postWithEnter} onChange={changeTitle} value={title}
                       className={'rounded-[.2em] p-[.25em] h-[1.8em] text-primary'} type="text"/>
                <div className={'flex justify-between'}>
                    <button className={'btn'} onClick={postTodolist}>Add list</button>
                    <button className={'btn !w-[60px]'} onClick={() => setIsActive(false)}>X</button>
                </div>
            </> : (
                <div onClick={activeHandler} className={'cursor-pointer opacity-[.6] hover:opacity-[1] border-2 p-[.7em] rounded h-[40px] flex items-center'}>
                    <p>+ Add another list</p>
                </div>
            )}
        </div>
    );
};

export default AddList;