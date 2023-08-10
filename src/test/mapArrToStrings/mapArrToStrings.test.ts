import {mapArrToStrings} from "./mapArrToStrings";


describe('Массив элементов в массив строк', () => {
    test('Массив any элементов', () => {
        expect(mapArrToStrings([1,2,3,true,'lol',5])).toEqual(['1','2','3','5'])
    })
    test('Массив только из чисел', () => {
        expect(mapArrToStrings([1,2,3])).toStrictEqual(['1','2','3'])
    })
    test('Массив без чисел', () => {
        expect(mapArrToStrings(['1','hello', false, null])).toStrictEqual([])
    })
    test('Empty arr', () => {
        expect(mapArrToStrings([])).toEqual([])
    })
    test('not equal', () => {
        expect(mapArrToStrings([1,2,3])).not.toEqual([1,2,3])
    })
})