import React from 'react';
import {NavLink} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {logoutThunk} from "../../store/actionCreators/authThunks";

const Header = () => {
    const {login} = useTypedSelector(state => state.auth)
    const dispatch: any = useDispatch()
    const logooutHandler = () => {
        dispatch(logoutThunk())
    }

    return (
        <header className={'bg-lime-400 p-[20px] bg-[#FED36A]'}>
            <div className="container flex justify-between">
                <div className={'uppercase font-bold text-primary'}>Todolist</div>
                <div className={'flex gap-5'}>
                    {login ? <button onClick={logooutHandler}>Log out</button> : <NavLink to={'/auth'}>Log in</NavLink>}
                    {login && <div>{login}</div>}
                </div>
            </div>
        </header>
    );
};

export default Header;