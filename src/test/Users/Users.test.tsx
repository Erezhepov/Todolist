import axios from 'axios'
import {render, screen} from "@testing-library/react";
import Users from "./Users";
import "@testing-library/react"

jest.mock('axios')

describe('Users render', () => {
    let response : any

    beforeEach(() => {
        response = {
            data: [
                {
                    "id": 1,
                    "name": "Leanne Graham",
                },
                {
                    "id": 2,
                    "name": "Ervin Howell",
                },
            ]
        }
    })

    test('user test', async () => {
        // @ts-ignore
        axios.get.mockReturnValue(response)
        render(<Users />)
        const users = await screen.findAllByTestId('user')
        expect(axios.get).toBeCalledTimes(1)
        expect(users.length).toBe(2)
    })
})