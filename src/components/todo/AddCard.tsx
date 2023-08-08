import React, {useState} from 'react';
import {postTodoTasksAC} from "../../store/actionCreators/todoThunks";
import {useDispatch} from "react-redux";

interface IAddCard {
    id: string
}

const AddCard: React.FC<IAddCard> = ({id}) => {
    const dispatch: any = useDispatch()
    const [title, setTitle] = useState('')
    const [isActive, setIsActive] = useState(false)
    const postWithEnter = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title.length > 0){
            setIsActive(false)
            dispatch(postTodoTasksAC(id, title))
            setTitle('')
        }
    }
    const activeHandler = () => {
        setIsActive(true)
    }
    const postTodolist = () => {
        if (title.length > 0){
            setIsActive(false)
            dispatch(postTodoTasksAC(id, title))
            setTitle('')
        }
    }
    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div className={'flex flex-col gap-3  min-w-[240px] mt-2.5'}>
            { isActive ? <>
                <input placeholder={'Enter a title for this card...'} autoFocus onKeyPress={postWithEnter} onChange={changeTitle} value={title}
                       className={'rounded-[.2em] p-[.25em] h-[1.8em] text-primary'} type="text"/>
                <div className={'flex justify-between'}>
                    <button className={'btn '} onClick={postTodolist}>Add Card</button>
                    <button className={'btn !w-[60px]'} onClick={() => setIsActive(false)}>X</button>
                </div>
            </> : (
                <div onClick={activeHandler} className={'cursor-pointer opacity-[.6] hover:opacity-[1] border-2 p-[.7em] rounded h-[40px] flex items-center'}>
                    <p>+ Add Card</p>
                </div>
            )}
        </div>
    );
};

export default AddCard;