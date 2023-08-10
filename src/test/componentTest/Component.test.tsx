import Component from "./Component";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";


describe('Component', () => {
    test('render Component', () => {
        render(<Component />)
        const btn: any = screen.queryByRole('button')
        expect(screen.queryByText(/title/i)).toBeNull()
        fireEvent.click(btn)
        expect(screen.queryByText(/title/i)).toBeInTheDocument()
        fireEvent.click(btn)
        expect(screen.queryByText(/title/i)).toBeNull()
    })

    test('render input', () => {
        render(<Component />)
        const input = screen.getByPlaceholderText('enter')
        const value = screen.queryByTestId('input-value')
        expect(value).toContainHTML('')
        userEvent.type(input, '123')
        expect(value).toBeInTheDocument()
        expect(value).toContainHTML('123')
    })
})