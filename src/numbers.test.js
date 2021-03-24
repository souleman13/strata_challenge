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
    test('1', async () => {
        expect(await toRomanNumeral(1)).toBe('I');
    });
    test('1001', async () => {
        expect(await toRomanNumeral(1001)).toBe('MI');
    });
    test('391', async () => {
        expect(await toRomanNumeral(391)).toBe('CCCXCI');
    });
    test('573', async () => {
        expect(await toRomanNumeral(573)).toBe('DLXXIII');
    });
    test('2463', async () => {
        expect(await toRomanNumeral(2463)).toBe('MMCDLXIII');
    });
    test('3999', async () => {
        expect(await toRomanNumeral(3999)).toBe('MMMCMXCIX');
    });
    //error cases
    test('input is not a valid roman numeral', async () => {
        const result = await toArabicNumeral('IMXIM')
        expect(result.err).toBe('input is not a valid roman numeral below 4000');
    });
})