import {getData} from "./getData";
import axios from "axios";

jest.mock('axios')
describe('getData', () => {
    let response: any
    beforeEach(() => {
        response = {
            data: [
                {"id": 1,},
                {"id": 2,},
            ]
        }
    })

    test('axiosWasOneTime',() => {
        getData()
        expect(axios.get).toBeCalledTimes(1)
    })
    test('correct values', async () => {
        // @ts-ignore
        axios.get.mockReturnValue(response)
        const data = await getData()
        expect(data).toEqual(['1','2'])
    })
})