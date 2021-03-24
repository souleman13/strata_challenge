const numberService = require('./numbers')

describe('toArabicNumeral', () => {
    const toArabicNumeral = numberService.toArabicNumeral
    //success cases
    test('IX', async () => {
        expect(await toArabicNumeral('IX')).toBe(9);
    });
    test('III', async () => {
        expect(await toArabicNumeral('III')).toBe(3);
    });
    test('MMMCMXCIX', async () => { //max roman numeral based on conversion
        expect(await toArabicNumeral('MMMCMXCIX')).toBe(3999);
    });
    test('lowercase letters', async () => {
        expect(await toArabicNumeral('iii')).toBe(3);
    });
    //error cases
    test('input includes invalid letter', async () => {
        const result = await toArabicNumeral('IMXYIM')
        expect(result.err).toBe('input is not a valid roman numeral below 4000')
    });
    test('input is not a valid roman numeral', async () => {
        const result = await toArabicNumeral('IMXIM')
        expect(result.err).toBe('input is not a valid roman numeral below 4000');
    });
})

describe('toRomanNumeral', () => {
    const toRomanNumeral = numberService.toRomanNumeral
    //success cases
    test('', async () => {
        expect(await toRomanNumeral(17)).toBe(17);
    });
    //error cases
})