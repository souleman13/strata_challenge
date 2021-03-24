
const isRoman = (string) => {
    // regex pattern
    const pattern = /^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/
    return pattern.test(string);
};

const toArabicNumeral = async (startVal) => {
    const conversionMap = { "M": 1000, "D": 500, "C": 100, "L": 50, "X": 10, "V": 5, "I": 1 }
    //convert all letters uppercase
    const romanNumeral = startVal.toUpperCase()
    //error and type checking
    if (
        //only includes valid roman numeral letters
        !isRoman(romanNumeral)
        //other error checks...
    ) return { err: 'input is not a valid roman numeral below 4000' }

    //Do Work...
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
    //type and error checks
    if (typeof parseInt(startVal) !== 'number')
        return { err: 'input is not a number' }

    const digits = String(+startVal).split("")
    const key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
        "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
    let roman_num = ""
    let i = 3;
    while (i--)
        roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
    return Array(+digits.join("") + 1).join("M") + roman_num;
}

module.exports = { toArabicNumeral, toRomanNumeral }