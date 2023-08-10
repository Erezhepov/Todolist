import {delay} from "./delay";

describe('delay', () => {
    test('sum after 1s', async () => {
        const result = await delay(() => 5 + 5, 1000)
        expect(result).toBe(10)
    })
})
