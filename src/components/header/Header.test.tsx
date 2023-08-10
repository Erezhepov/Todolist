import {render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import TodolistPage from "../../pages/TodolistPage";
import AuthPage from "../../pages/AuthPage";
import React from "react";
import Header from "./Header";
import userEvent from "@testing-library/user-event";
import {Provider} from "react-redux";
import {store} from "../../store";

jest.mock('../../hooks/useTypedSelector')

describe('header', () => {
    test('header nav link', async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Header />
                    <Routes>
                        <Route path={'/'} element={<TodolistPage />} />
                        <Route path={'/auth'} element={<AuthPage />} />
                    </Routes>
                </Provider>
            </MemoryRouter>
        )
        const navLink = await screen.findByTestId('auth-link')
        userEvent.click(navLink)
        expect(screen.getByTestId('authPage')).toBeInTheDocument()
    })
})