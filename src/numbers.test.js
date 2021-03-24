const numberService = require('./numbers')

describe('toArabicNumeral', () => {
    const toArabicNumeral = numberService.toArabicNumeral
    //success cases
    test('IX', async () => {
        expect(await toArabicNumeral('IX')).toBe(9);
    });
    // test('III', async () => {
    //     expect(await toArabicNumeral(17)).toBe(17);
    // });
    // test('lowercase letters', async () => {
    //     expect(await toArabicNumeral(17)).toBe(17);
    // });
    //error cases
})

describe('toRomanNumeral', () => {
    const toRomanNumeral = numberService.toRomanNumeral
    //success cases
    test('', async () => {
        expect(await toRomanNumeral(17)).toBe(17);
    });
    //error cases
})