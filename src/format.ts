import {
    MONTHS_EN,
    MONTHS_NP,
    MONTHS_SHORT_EN,
    MONTHS_SHORT_NP,
    NUM_NP,
    WEEKDAYS_LONG_EN,
    WEEKDAYS_LONG_NP,
    WEEKDAYS_SHORT_EN,
    WEEKDAYS_SHORT_NP,
} from './constants'

type Locale = 'en' | 'ne'

interface NepaliDate {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    weekDay: number
    getYear: () => number
    getMonth: () => number
    getDate: () => number
    getHours: () => number
    getMinutes: () => number
    getSeconds: () => number
    getMilliseconds: () => number
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

/**
 * Pads a number with a leading zero if it is less than 10.
 *
 * Output: 1 => 01, 11 => 11
 *
 * @param n - The number to be padded.
 * @returns The padded number as a string.
 */
function zeroPadding(n: number): string {
    if (n < 10) {
        return `0${n}`
    }
    return `${n}`
}

/**
 * Pads a number with a leading zero if it is less than 100.
 *
 * Output: 1 => 001, 11 => 011, 111 => 111
 *
 * @param n - The number to be padded.
 * @returns The padded number as a string.
 */
function millisecondZeroPadding(n: number): string {
    if (n < 10) {
        return `00${n}`
    } else if (n < 100) {
        return `0${n}`
    }
    return `${n}`
}

function npDigit(str: string): string {
    let res = ''
    for (let i = 0; i < str.length; i += 1) {
        res += NUM_NP[str.charCodeAt(i) - 48]
    }
    return res
}

/* Formatters */

function yearEn(format: string, size: number): Formatter {
    return date => {
        if (size === 1 || size === 4) return String(date.year)
        if (size === 2) {
            return String(date.year).substring(2)
        }
        return format.repeat(size)
    }
}

function yearNp(format: string, size: number): Formatter {
    return date => {
        if (size === 1 || size === 4) return npDigit(String(date.year))
        if (size === 2) {
            return npDigit(String(date.year).substring(2))
        }
        return format.repeat(size)
    }
}

function monthEn(format: string, size: number): Formatter {
    return date => {
        if (size === 1) {
            return String(date.month + 1)
        }
        if (size === 2) {
            return zeroPadding(date.month + 1)
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
    return date => {
        if (size === 1) {
            return npDigit(String(date.month + 1))
        }
        if (size === 2) {
            return npDigit(zeroPadding(date.month + 1))
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
    return date => {
        if (size === 1) {
            return String(date.day)
        }
        if (size === 2) {
            return zeroPadding(date.day)
        }
        return format.repeat(size)
    }
}

function dateNp(format: string, size: number): Formatter {
    return date => {
        if (size === 1) {
            return npDigit(String(date.day))
        }
        if (size === 2) {
            return npDigit(zeroPadding(date.day))
        }
        return format.repeat(size)
    }
}

function weekDayEn(format: string, size: number): Formatter {
    return date => {
        if (size === 1) {
            return String(date.weekDay)
        }
        if (size > 1 && size < 4) {
            // "dd" and "ddd" => "Fri"
            return WEEKDAYS_SHORT_EN[date.weekDay]
        }
        if (size === 4) {
            return WEEKDAYS_LONG_EN[date.weekDay]
        }

        return format.repeat(size)
    }
}

function weekDayNp(format: string, size: number): Formatter {
    return date => {
        if (size === 1) {
            return npDigit(String(date.weekDay))
        }
        if (size > 1 && size < 4) {
            return WEEKDAYS_SHORT_NP[date.weekDay]
        }
        if (size === 4) {
            return WEEKDAYS_LONG_NP[date.weekDay]
        }

        return format.repeat(size)
    }
}

function hour24En(format: string, size: number): Formatter {
    return date => {
        if (size === 1) {
            return String(date.hour)
        }
        if (size === 2) {
            return zeroPadding(date.hour)
        }
        return format.repeat(size)
    }
}

function hour24Np(format: string, size: number): Formatter {
    return date => {
        if (size === 1) {
            return npDigit(String(date.hour))
        }
        if (size === 2) {
            return npDigit(zeroPadding(date.hour))
        }
        return format.repeat(size)
    }
}

function hour12En(format: string, size: number): Formatter {
    return date => {
        const hour = date.hour > 12 ? date.hour - 12 : date.hour

        if (size === 1) {
            return String(hour)
        }
        if (size === 2) {
            return zeroPadding(hour)
        }
        return format.repeat(size)
    }
}

function hour12Np(format: string, size: number): Formatter {
    return date => {
        const hour = date.hour > 12 ? date.hour - 12 : date.hour

        if (size === 1) {
            return npDigit(String(hour))
        }
        if (size === 2) {
            return npDigit(zeroPadding(hour))
        }
        return format.repeat(size)
    }
}

function minuteEn(format: string, size: number): Formatter {
    return date => {
        if (size === 1) {
            return String(date.minute)
        }
        if (size === 2) {
            return zeroPadding(date.minute)
        }
        return format.repeat(size)
    }
}

function minuteNp(format: string, size: number): Formatter {
    return date => {
        if (size === 1) {
            return npDigit(String(date.minute))
        }
        if (size === 2) {
            return npDigit(zeroPadding(date.minute))
        }
        return format.repeat(size)
    }
}

function secondEn(format: string, size: number): Formatter {
    return date => {
        const seconds = date.getSeconds()
        if (size === 1) {
            return String(seconds)
        }
        if (size === 2) {
            return zeroPadding(seconds)
        }
        return format.repeat(size)
    }
}

function secondNp(format: string, size: number): Formatter {
    return date => {
        const seconds = date.getSeconds()
        if (size === 1) {
            return npDigit(String(seconds))
        }
        if (size === 2) {
            return npDigit(zeroPadding(seconds))
        }
        return format.repeat(size)
    }
}

function millisecondEn(format: string, size: number): Formatter {
    return date => {
        const ms = date.getMilliseconds()
        if (size < 4) {
            return millisecondZeroPadding(ms).substring(0, size)
        }
        if (size < 10) {
            return `${millisecondZeroPadding(ms)}${'0'.repeat(size - 3)}`
        }
        return format.repeat(size)
    }
}

function millisecondNp(format: string, size: number): Formatter {
    return date => {
        const ms = date.getMilliseconds()
        if (size < 4) {
            return npDigit(millisecondZeroPadding(ms).substring(0, size))
        }
        if (size < 10) {
            return npDigit(`${millisecondZeroPadding(ms)}${'0'.repeat(size - 3)}`)
        }
        return format.repeat(size)
    }
}

function amPmUpperCaseEn(format: string, size: number): Formatter {
    return date => {
        return date.hour > 12 ? 'PM' : 'AM'
    }
}

function amPmNp(format: string, size: number): Formatter {
    return date => {
        /**
         * The output of this method is yet to be decided.
         * Further discussion are needed for this method.
         *
         * The most common words used in Nepal are below:
         * - बिहान
         * - मध्यान्ह
         * - दिउसो
         * - बेलुका
         * - रात
         */
        return format
    }
}

function amPmLowerCaseEn(format: string, size: number): Formatter {
    return date => {
        return date.hour > 12 ? 'pm' : 'am'
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
    M: monthEn,
    D: dateEn,
    d: weekDayEn,
    H: hour24En,
    h: hour12En,
    m: minuteEn,
    s: secondEn,
    S: millisecondEn,
    A: amPmUpperCaseEn,
    a: amPmLowerCaseEn,
}

/**
 * Map of formatter factory functions for Nepali format.
 */
const formattersFactoryMapNp: FormatterFactoryMap = {
    Y: yearNp,
    M: monthNp,
    D: dateNp,
    d: weekDayNp,
    H: hour24Np,
    h: hour12Np,
    m: minuteNp,
    s: secondNp,
    S: millisecondNp,
    A: amPmNp,
    a: amPmNp,
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
    let seq = ''
    let special = ''
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
        if (special !== '') {
            const formatterFactory = formattersFactoryMap[special]
            const formatter = formatterFactory(special, specialSize)
            formatters.push(formatter)
            special = ''
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
                seq = ''
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
        .map(f => f(nepaliDate))
        .join('')
}

export function formatNepali(nepaliDate: NepaliDate, formatStr: string): string {
    return getFormatters(formatStr, 'ne')
        .map(f => f(nepaliDate))
        .join('')
}

/**
 * Converts a NepaliDate object to a toString() representation.
 * Returns in format YYYY-MM-DD HH:mm:ss[.SSS].
 * This method is light-weight than format/formatNepali method.
 *
 * @param nepaliDate - The NepaliDate object to be converted.
 * @returns The formatted string representation of the NepaliDate.
 */
export function nepaliDateToString(nepaliDate: NepaliDate) {
    const dateString = `${zeroPadding(nepaliDate.getYear())}-${zeroPadding(
        nepaliDate.getMonth() + 1
    )}-${zeroPadding(nepaliDate.getDate())}`
    const timeString = `${zeroPadding(nepaliDate.getHours())}:${zeroPadding(
        nepaliDate.getMinutes()
    )}:${zeroPadding(nepaliDate.getSeconds())}`

    // millisecond
    const ms = nepaliDate.getMilliseconds()
    let millisecondString
    if (ms === 0) {
        millisecondString = ''
    } else {
        millisecondString = `.${millisecondZeroPadding(ms)}`
    }

    return `${dateString} ${timeString}${millisecondString}`
}
