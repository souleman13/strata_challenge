
const conversionMap = { "M": 1000, "D": 500, "C": 100, "L": 50, "X": 10, "V": 5, "I": 1 }

const toArabicNumeral = async (startVal) => {
    //error checking
    //make all letters uppercase to match convertion map

    const array = startVal.split('')

    let total = 0
    let current
    let currentVal
    let next
    let nextVal

    for (let i = 0; i < array.length; i++) {
        current = array[i]
        currentVal = conversionMap[current]
        next = array[i+1]
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