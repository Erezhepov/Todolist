import React, {useEffect} from 'react';
import Header from './components/header/Header';
import {Route, Routes, useNavigate} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import TodolistPage from "./pages/TodolistPage";
import {fetchAuth} from "./store/actionCreators/authThunks";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "./hooks/useTypedSelector";

function App() {
    const dispatch: any = useDispatch()
    const {login} = useTypedSelector(state => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(fetchAuth())
    }, [dispatch])
    useEffect(() => {
        if (login === null || login?.length === 0){
            navigate('/auth')
        }
    }, [login, navigate])

  return (
      <div className={'h-[100%]'}>
          <Header />
          <div className="content">
              <Routes>
                  <Route path={'/'} element={<TodolistPage />} />
                  <Route path={'/auth'} element={<AuthPage />} />
              </Routes>
          </div>
      </div>
  )
}

export default App;