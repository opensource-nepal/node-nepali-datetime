import {
    MONTHS_EN,
    MONTHS_NP,
    MONTHS_SHORT_EN,
    MONTHS_SHORT_NP,
    NUM_NP,
    WEEKDAYS_LONG_EN,
    WEEKDAYS_LONG_NP,
    WEEKDAYS_SHORT_EN,
    WEEKDAYS_SHORT_NP
} from "./constants"

interface NepaliDate {
    year: number;
    month: number;
    day: number;
    getDay(): number;
}

function pad(n: number): string {
    if (n < 10) {
        return `0${n}`
    }
    return `${n}`
}

function npDigit(str: string): string {
    let res = ""
    for (let i = 0; i < str.length; i += 1) {
        res += NUM_NP[str.charCodeAt(i) - 48]
    }
    return res
}

function yearEn(size: number): (date: NepaliDate) => string {
    return (date) => {
        if (size <= 2) {
            return String(date.year).substring(2)
        }
        if (size === 3) {
            return String(date.year).substring(1)
        }
        return String(date.year)
    }
}

function yearNp(size: number): (date: NepaliDate) => string {
    return (date) => {
        if (size <= 2) {
            return npDigit(String(date.year).substring(2))
        }
        if (size === 3) {
            return npDigit(String(date.year).substring(1))
        }
        return npDigit(String(date.year))
    }
}

function monthEn(size: number): (date: NepaliDate) => string {
    return (date) => {
        if (size === 1) {
            return String(date.month + 1)
        }
        if (size === 2) {
            return pad(date.month + 1)
        }
        if (size === 3) {
            return MONTHS_SHORT_EN[date.month]
        }
        return MONTHS_EN[date.month]
    }
}

function monthNp(size: number): (date: NepaliDate) => string {
    return (date) => {
        if (size === 1) {
            return npDigit(String(date.month + 1))
        }
        if (size === 2) {
            return npDigit(pad(date.month + 1))
        }
        if (size === 3) {
            return MONTHS_SHORT_NP[date.month]
        }
        return MONTHS_NP[date.month]
    }
}

function dateEn(size: number): (date: NepaliDate) => string {
    return (date) => {
        if (size === 1) {
            return String(date.day)
        }
        if (size === 2) {
            return pad(date.day)
        }
    }
}

function dateNp(size: number): (date: NepaliDate) => string {
    return (date) => {
        if (size === 1) {
            return npDigit(String(date.day))
        }
        if (size === 2) {
            return npDigit(pad(date.day))
        }
    }
}

function weekDayEn(size: number): (date: NepaliDate) => string {
    return (date) => {
        if (size === 1) {
            return String(date.getDay())
        }
        if (size > 1 && size < 4) {
            // "dd" and "ddd" => "Fri"
            return WEEKDAYS_SHORT_EN[date.getDay()]
        }
        return WEEKDAYS_LONG_EN[date.getDay()]
    }
}

function pass(seq: string): () => string {
    return () => seq
}


const formatToFunctionMap: { [key: string]: (size: number) => (date: NepaliDate) => string } = {
    Y: yearEn,
    // y: yearNp,
    M: monthEn,
    // m: monthNp,
    D: dateEn,
    d: weekDayEn,
}

function isSpecial(ch: string) {
    return ch in formatToFunctionMap
}

function tokenize(formatStr: string) {
    let inQuote = false
    let seq = ""
    let special = ""
    let specialSize = 0

    const tokens = [] as ((date: NepaliDate) => string)[]

    for (const ch of formatStr) {
        if (ch === special) {
            specialSize += 1
            // eslint-disable-next-line no-continue
            continue
        }

        // Time to process special
        if (special !== "") {
            tokens.push(formatToFunctionMap[special](specialSize))
            special = ""
            specialSize = 0
        }

        if (ch === '"') {
            inQuote = !inQuote
            // eslint-disable-next-line no-continue
            continue
        }

        if (!isSpecial(ch) || inQuote) {
            seq += ch
        } else {
            // got a special character
            if (seq) {
                tokens.push(pass(seq))
                seq = ""
            }

            special = ch
            specialSize = 1
        }
    }

    if (seq) {
        tokens.push(pass(seq))
    } else if (special) {
        tokens.push(formatToFunctionMap[special](specialSize))
    }

    return tokens
}

export default function format(nepaliDate: NepaliDate, formatStr: string): string {
    return tokenize(formatStr)
        .map((f) => f(nepaliDate))
        .join("")
}
