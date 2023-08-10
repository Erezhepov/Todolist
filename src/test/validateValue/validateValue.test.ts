import {validateValue} from "./validateValue";

describe('validateValue', () => {
    test('Correct value', () => {
        expect(validateValue(10)).toBe(true)
    })
    test('Incorrect value', () => {
        expect(validateValue(-1)).toBe(false)
    })
    test('Border smallest value', () => {
        expect(validateValue(0)).toBe(true)
    })
    test('Border the biggest value', () => {
        expect(validateValue(100)).toBe(true)
    })
})