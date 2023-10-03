import {
    LOCALE_EN,
    LOCALE_NE,
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
import { parseFormatTokens } from './utils'

interface NepaliDate {
    getYear: () => number
    getMonth: () => number
    getDate: () => number
    getDay: () => number
    getHours: () => number
    getMinutes: () => number
    getSeconds: () => number
    getMilliseconds: () => number
}

type Locale = typeof LOCALE_EN | typeof LOCALE_NE

interface Formatter {
    (nepaliDate: NepaliDate, locale: Locale): string
}

/* Helper functions */

/**
 * Pads a number with a leading zero if it is less than 10.
 *
 * Output: 1 => 01, 11 => 11
 *
 * @param value - The number to be padded.
 * @returns The padded number as a string.
 */
const zeroPad = (value: number) => value.toString().padStart(2, '0')

/**
 * Pads a number with a leading zero if it is less than 100.
 *
 * Output: 1 => 001, 11 => 011, 111 => 111
 *
 * @param value - The number to be padded.
 * @returns The padded number as a string.
 */
const millisecondZeroPad = (value: number) => value.toString().padStart(3, '0')

/**
 * Converts English digits to Nepali digits (Devanagari script).
 *
 * @param {string} str - English digits in string format.
 * @returns {string} Nepali digits in string format.
 */
const npDigit = (str: string): string => {
    return str
        .split('')
        .map(chr => NUM_NP[chr.charCodeAt(0) - 48])
        .join('')
}

/**
 * Returns a localized number (digit) in string format.
 * Converts to Nepali digits for Nepali localization.
 *
 * @param {string | number} obj - The string or number to be localized.
 * @param {Locale} locale - The locale specifying the localization (e.g., 'en' or 'ne').
 * @returns {string} The localized number in string format.
 */
const localizedNumberString = (obj: string | number, locale: Locale): string => {
    const objInString = typeof obj === 'string' ? obj : String(obj)
    if (locale !== LOCALE_NE) {
        return objInString
    }
    return npDigit(objInString)
}

/* FORMATTERS */

const halfYear: Formatter = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getYear(), locale).substring(2)
}

const fullYear: Formatter = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getYear(), locale)
}

const monthNumber: Formatter = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getMonth() + 1, locale)
}

const monthTwoDigit: Formatter = (nepaliDate, locale) => {
    return localizedNumberString(zeroPad(nepaliDate.getMonth() + 1), locale)
}

const monthAbbrName: Formatter = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return MONTHS_SHORT_NP[nepaliDate.getMonth()]
    }
    return MONTHS_SHORT_EN[nepaliDate.getMonth()]
}

const monthFullName: Formatter = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return MONTHS_NP[nepaliDate.getMonth()]
    }
    return MONTHS_EN[nepaliDate.getMonth()]
}

const dayNumber: Formatter = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getDate(), locale)
}

const dayTwoDigit: Formatter = (nepaliDate, locale) => {
    return localizedNumberString(zeroPad(nepaliDate.getDate()), locale)
}

const weekDayNumber: Formatter = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getDay(), locale)
}

const weekDayShortName: Formatter = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return WEEKDAYS_SHORT_NP[nepaliDate.getDay()]
    }
    return WEEKDAYS_SHORT_EN[nepaliDate.getDay()]
}

const weekDayFullName: Formatter = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return WEEKDAYS_LONG_NP[nepaliDate.getDay()]
    }
    return WEEKDAYS_LONG_EN[nepaliDate.getDay()]
}

const hour24Number: Formatter = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getHours(), locale)
}

const hour24TwoDigit: Formatter = (nepaliDate, locale) => {
    return localizedNumberString(zeroPad(nepaliDate.getHours()), locale)
}

const hour12Number: Formatter = (nepaliDate, locale) => {
    const hour24 = nepaliDate.getHours()
    const hour = hour24 > 12 ? hour24 - 12 : hour24
    return localizedNumberString(hour, locale)
}

const hour12TwoDigit: Formatter = (nepaliDate, locale) => {
    const hour24 = nepaliDate.getHours()
    const hour = hour24 > 12 ? hour24 - 12 : hour24
    return localizedNumberString(zeroPad(hour), locale)
}

const minuteNumber: Formatter = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getMinutes(), locale)
}

const minuteTwoDigit: Formatter = (nepaliDate, locale) => {
    return localizedNumberString(zeroPad(nepaliDate.getMinutes()), locale)
}

const secondNumber: Formatter = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getSeconds(), locale)
}

const secondTwoDigit: Formatter = (nepaliDate, locale) => {
    return localizedNumberString(zeroPad(nepaliDate.getSeconds()), locale)
}

const millisecondThreeDigit: Formatter = (nepaliDate, locale) => {
    return localizedNumberString(
        millisecondZeroPad(nepaliDate.getMilliseconds()),
        locale
    )
}

const amPmUpperCase: Formatter = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
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
        return 'A'
    }
    return nepaliDate.getHours() >= 12 ? 'PM' : 'AM'
}

const amPmLowerCase: Formatter = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return 'a'
    }
    return nepaliDate.getHours() >= 12 ? 'pm' : 'am'
}

/* Formatters mapping and implementations */

const TOKENS_TO_FORMATTER: { [key: string]: Formatter } = {
    YY: halfYear,
    YYYY: fullYear,
    M: monthNumber,
    MM: monthTwoDigit,
    MMM: monthAbbrName,
    MMMM: monthFullName,
    D: dayNumber,
    DD: dayTwoDigit,
    d: weekDayNumber,
    dd: weekDayShortName,
    ddd: weekDayShortName,
    dddd: weekDayFullName,
    H: hour24Number,
    HH: hour24TwoDigit,
    h: hour12Number,
    hh: hour12TwoDigit,
    m: minuteNumber,
    mm: minuteTwoDigit,
    s: secondNumber,
    ss: secondTwoDigit,
    SSS: millisecondThreeDigit,
    A: amPmUpperCase,
    a: amPmLowerCase,
}

/**
 * Converts a Nepali date object to a formatted string.
 *
 * @param {NepaliDate} nepaliDate - The Nepali date object to be formatted.
 * @param {string} format - The format string to specify the desired output format.
 * @param {Locale} locale - The locale specifying the localization (e.g., 'en' or 'ne').
 * @returns {string} The formatted date in string format.
 */
const formatDate = (nepaliDate: NepaliDate, format: string, locale: Locale): string => {
    const tokens = parseFormatTokens(format)
    const formatToken = (token: string) => {
        if (!(token in TOKENS_TO_FORMATTER)) {
            return token
        }
        return TOKENS_TO_FORMATTER[token](nepaliDate, locale)
    }
    return tokens.map(formatToken).join('')
}

/**
 * Returns a string representation (in English) of the NepaliDate object in the specified format.
 *
 * @param {NepaliDate} nepaliDate - The Nepali date object to be formatted.
 * @param {string} format - The format string for the desired output.
 * @returns {string} - The formatted Nepali date string.
 */
export const format = (nepaliDate: NepaliDate, format: string): string => {
    return formatDate(nepaliDate, format, LOCALE_EN)
}

/**
 * Returns a string representation in the Nepali (Devanagari) of the NepaliDate object in the specified format.
 *
 * @param {NepaliDate} nepaliDate - The Nepali date object to be formatted.
 * @param {string} format - The format string for the desired output.
 * @returns {string} - A string representation of the NepaliDate object in the specified format.
 */
export const formatNepali = (nepaliDate: NepaliDate, format: string): string => {
    return formatDate(nepaliDate, format, LOCALE_NE)
}

/**
 * Converts a NepaliDate object to a toString() representation.
 * Returns in format "YYYY-MM-DD HH:mm:ss[.SSS]".
 * This method is lightweight compared to the format/formatNepali method.
 *
 * @param {NepaliDate} nepaliDate - The NepaliDate object to be converted.
 * @returns {string} The formatted string representation of the NepaliDate.
 */
export const nepaliDateToString = (nepaliDate: NepaliDate): string => {
    const year = zeroPad(nepaliDate.getYear())
    const month = zeroPad(nepaliDate.getMonth() + 1)
    const date = zeroPad(nepaliDate.getDate())
    const hours = zeroPad(nepaliDate.getHours())
    const minutes = zeroPad(nepaliDate.getMinutes())
    const seconds = zeroPad(nepaliDate.getSeconds())
    const milliseconds = nepaliDate.getMilliseconds()
    const millisecondString =
        milliseconds === 0 ? '' : `.${millisecondZeroPad(milliseconds)}`

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}${millisecondString}`
}
