// import {getTodolistAC} from "./todoThunks";
import axios from "axios";

jest.mock('axios')

describe('todoThunks', () => {
    let dispatch: any
    beforeAll(() => {
        dispatch = jest.fn()
    })
    test('getTodolistAC', async () => {
        let response = {
            data: {
                resultCode: 0,
                data: {title: 'newList', order: 0, id: '12d1-dfwef1-12', addedDATE: 'someData'}
            }
        }
        // @ts-ignore
        axios.get.mockReturnValue(response)
        // const thunk = getTodolistAC()
        // await thunk(dispatch)
    })
})