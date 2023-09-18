import {render, screen} from "@testing-library/react";
import App from "./App";
import {MemoryRouter} from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./store";
import '@testing-library/jest-dom'


describe('App test', () => {
    test('App render', () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </MemoryRouter>
        )
        const content: HTMLElement = screen.getByTestId('content')
        expect(content).toBeInTheDocument()
    })
})