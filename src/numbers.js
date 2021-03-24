
const conversionMap = { "M": 1000, "D": 500, "C": 100, "L": 50, "X": 10, "V": 5, "I": 1 }

const isRoman = (string) => {
    // regex pattern
    const pattern = /^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/
    return pattern.test(string);
};

const toArabicNumeral = async (startVal) => {
    //all letters uppercase
    const romanNumeral = startVal.toUpperCase()
    //error checking
    if (
        //only includes valid roman numeral letters
        !isRoman(romanNumeral)
        //other error checks...
        ) return { error: 'input is not a valid roman numeral below 4000' }
    const array = romanNumeral.split('')

    let total = 0
    let current
    let currentVal
    let next
    let nextVal

    for (let i = 0; i < array.length; i++) {
        current = array[i]
        currentVal = conversionMap[current]
        next = array[i + 1]
        nextVal = conversionMap[next]

        if (currentVal < nextVal) {
            total -= currentVal
        } else {
            total += currentVal
        }
    }
    return total
}

const toRomanNumeral = async (startVal) => {
    const numeral = await parseInt(startVal)
    return numeral
}

module.exports = { toArabicNumeral, toRomanNumeral }