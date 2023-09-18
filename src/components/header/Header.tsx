import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import {apiAuth} from "../../store/slices/apiAuth";
import Loading from "../Loading";
import {ErrorFetch} from "../ErrorFetch";

interface HeaderAuthData{
    login: string | null | undefined
}

const Header: FC<HeaderAuthData> = ({login}) => {
    const [logout, {isLoading, error}] = apiAuth.useLogoutMutation()
    const logoOutHandler = () => {
        logout(null)
    }
    if (error) return <ErrorFetch error={'Ошибка при выходе'}  />
    return (
        <>
            {isLoading && <Loading />}
            <header className={'bg-lime-400 p-[20px] bg-[#FED36A]'}>
                <div className="container flex justify-between">
                    <div className={'uppercase font-bold text-primary'}>Todolist</div>
                    <div className={'flex gap-5'}>
                        {login ? <button onClick={logoOutHandler}>Log out</button> : <NavLink  data-testid={'auth-link'} to={'/auth'}>Log in</NavLink>}
                        {login && <div>{login}</div>}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;