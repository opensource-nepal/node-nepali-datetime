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

type Locale = 'en' | 'ne'

interface NepaliDate {
    year: number
    month: number
    day: number
    getDay(): number
}

interface Formatter {
    (date: NepaliDate): string
}

interface FormatterFactory {
    (format: string, size: number): Formatter
}

interface FormatterFactoryMap {
    [key: string]: FormatterFactory
}

/* Helper functions */

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

/* Formatters */

function yearEn(format: string, size: number): Formatter {
    return (date) => {
        if (size === 1 || size === 4)
            return String(date.year)
        if (size === 2) {
            return String(date.year).substring(2)
        }
        return format.repeat(size)
    }
}

function yearNp(format: string, size: number): Formatter {
    return (date) => {
        if (size === 1 || size === 4)
            return npDigit(String(date.year))
        if (size === 2) {
            return npDigit(String(date.year).substring(2))
        }
        return format.repeat(size)
    }
}

function monthEn(format: string, size: number): Formatter {
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
        if (size === 4) {
            return MONTHS_EN[date.month]
        }
        return format.repeat(size)
    }
}

function monthNp(format: string, size: number): Formatter {
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
        if (size === 4) {
            return MONTHS_NP[date.month]
        }
        return format.repeat(size)
    }
}

function dateEn(format: string, size: number): Formatter {
    return (date) => {
        if (size === 1) {
            return String(date.day)
        }
        if (size === 2) {
            return pad(date.day)
        }
        return format.repeat(size)
    }
}

function dateNp(format: string, size: number): Formatter {
    return (date) => {
        if (size === 1) {
            return npDigit(String(date.day))
        }
        if (size === 2) {
            return npDigit(pad(date.day))
        }
        return format.repeat(size)
    }
}

function weekDayEn(format: string, size: number): Formatter {
    return (date) => {
        if (size === 1) {
            return String(date.getDay())
        }
        if (size > 1 && size < 4) {
            // "dd" and "ddd" => "Fri"
            return WEEKDAYS_SHORT_EN[date.getDay()]
        }
        if (size === 4) {
            return WEEKDAYS_LONG_EN[date.getDay()]
        }

        return format.repeat(size)
    }
}

function weekDayNp(format: string, size: number): Formatter {
    return (date) => {
        if (size === 1) {
            return npDigit(String(date.getDay()))
        }
        if (size > 1 && size < 4) {
            return WEEKDAYS_SHORT_NP[date.getDay()]
        }
        if (size === 4) {
            return WEEKDAYS_LONG_NP[date.getDay()]
        }

        return format.repeat(size)
    }
}

function pass(seq: string): () => string {
    return () => seq
}

/* formatting functions */

/**
 * Map of formatter factory functions for English format.
 */
const formattersFactoryMapEn: FormatterFactoryMap = {
    Y: yearEn,
    // y: yearNp,
    M: monthEn,
    // m: monthNp,
    D: dateEn,
    d: weekDayEn,
}

/**
 * Map of formatter factory functions for Nepali format.
 */
const formattersFactoryMapNp: FormatterFactoryMap = {
    Y: yearNp,
    M: monthNp,
    D: dateNp,
    d: weekDayNp,
}

/**
 * Get the formatter map based on the locale.
 * @param locale - The locale identifier. Valid values are 'en' for English and 'ne' for Nepali.
 * @returns The formatter map for the specified locale.
 */
function getFormattersFactoryMap(locale: Locale): FormatterFactoryMap {
    if (locale === 'ne') {
        return formattersFactoryMapNp
    }
    return formattersFactoryMapEn
}


function isSpecial(ch: string, locale: Locale) {
    return ch in getFormattersFactoryMap(locale)
}

function getFormatters(formatStr: string, locale: Locale) {
    let inQuote = false
    let seq = ""
    let special = ""
    let specialSize = 0
    const formattersFactoryMap = getFormattersFactoryMap(locale)

    const formatters: Formatter[] = []

    for (const ch of formatStr) {
        if (ch === special) {
            specialSize += 1
            // eslint-disable-next-line no-continue
            continue
        }

        // Time to process special
        if (special !== "") {
            const formatterFactory = formattersFactoryMap[special]
            const formatter = formatterFactory(special, specialSize)
            formatters.push(formatter)
            special = ""
            specialSize = 0
        }

        if (ch === '"') {
            inQuote = !inQuote
            // eslint-disable-next-line no-continue
            continue
        }

        if (!isSpecial(ch, locale) || inQuote) {
            seq += ch
        } else {
            // got a special character
            if (seq) {
                formatters.push(pass(seq))
                seq = ""
            }

            special = ch
            specialSize = 1
        }
    }

    if (seq) {
        formatters.push(pass(seq))
    } else if (special) {
        const formatterFactory = formattersFactoryMap[special]
        const formatter = formatterFactory(special, specialSize)
        formatters.push(formatter)
    }

    return formatters
}

export function format(nepaliDate: NepaliDate, formatStr: string): string {
    return getFormatters(formatStr, 'en')
        .map((f) => f(nepaliDate))
        .join("")
}

export function formatNepali(nepaliDate: NepaliDate, formatStr: string): string {
    return getFormatters(formatStr, 'ne')
        .map((f) => f(nepaliDate))
        .join("")
}