import React, {useEffect} from 'react';
import Header from './components/header/Header';
import {Route, Routes, useNavigate} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import TodolistPage from "./pages/TodolistPage";
import {apiAuth} from "./store/slices/apiAuth";
import Loading from "./components/Loading";

function App() {
    const {isLoading, error, data} = apiAuth.useGetAuthQuery(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (!data?.data.login){
            navigate('/auth')
        }else{
            navigate('/')
        }
    }, [data, navigate])

  return (
      <div className={'h-[100%]'}>
          <Header login={data?.data?.login} />
          {isLoading && <Loading />}
          {error && <div>Ошибка при авторизации</div>}
          <div data-testId={'content'} className="content">
              <Routes>
                  <Route path={'/'} element={<TodolistPage />} />
                  <Route path={'/auth'} element={<AuthPage />} />
              </Routes>
          </div>
      </div>
  )
}

export default App;