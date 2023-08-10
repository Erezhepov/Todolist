import {mathPow} from "./mathPow";

describe('powTo2', () => {
    // let mockValue
    // beforeEach(() => {
    //     mockValue =
    // })
    test('toBe1', () => {
        expect(mathPow(1)).toBe(1)
    })
    test('toBe4', () => {
        expect(mathPow(2)).toBe(4)
    })
    test('moreThan8', () => {
        expect(mathPow(3)).toBeGreaterThan(8)
    })
    test('methodWasUsedZeroTime', () => {
        const times = jest.spyOn(Math, 'pow')
        mathPow(1)
        expect(times).toBeCalledTimes(0)
    })
    test('methodWasUsedOneTime', () => {
        const times = jest.spyOn(Math, 'pow')
        mathPow(2)
        expect(times).toBeCalledTimes(1)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
})