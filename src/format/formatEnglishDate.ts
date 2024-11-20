import { LOCALE_EN, LOCALE_NE } from '../constants'
import { parseFormatTokens } from '../utils'
import {
    amPmLowerCase,
    amPmUpperCase,
    englishDayNumber,
    englishDayTwoDigit,
    englishMonthAbbrName,
    englishMonthFullName,
    englishMonthNumber,
    englishMonthTwoDigit,
    Formatter,
    fullEnglishYear,
    halfEnglishYear,
    hour12Number,
    hour12TwoDigit,
    hour24Number,
    hour24TwoDigit,
    INepaliDate,
    Locale,
    millisecondThreeDigit,
    minuteNumber,
    minuteTwoDigit,
    secondNumber,
    secondTwoDigit,
    weekDayFullName,
    weekDayNumber,
    weekDayShortName,
} from './tokenFormatters'

const TOKENS_TO_FORMATTER: { [key: string]: Formatter } = {
    YY: halfEnglishYear,
    YYYY: fullEnglishYear,
    M: englishMonthNumber,
    MM: englishMonthTwoDigit,
    MMM: englishMonthAbbrName,
    MMMM: englishMonthFullName,
    D: englishDayNumber,
    DD: englishDayTwoDigit,
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
 * Converts a NepaliDate object's English Date to a formatted string.
 *
 * @param {INepaliDate} nepaliDate - The Nepali date object to be formatted.
 * @param {string} format - The format string to specify the desired output format.
 * @param {Locale} locale - The locale specifying the localization (e.g., 'en' or 'ne').
 * @returns {string} The formatted date in string format.
 */
const formatDate = (
    nepaliDate: INepaliDate,
    format: string,
    locale: Locale
): string => {
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
 * Returns a string representation (in English) of the English Date from NepaliDate object
 * in the specified format.
 *
 * @param {INepaliDate} nepaliDate - The Nepali date object to be formatted.
 * @param {string} format - The format string for the desired output.
 * @returns {string} - The formatted Nepali date string.
 */
export const formatEnglishDate = (nepaliDate: INepaliDate, format: string): string =>
    formatDate(nepaliDate, format, LOCALE_EN)

/**
 * Returns a string representation in the Nepali (Devanagari) of English Date from the
 * NepaliDate object in the specified format.
 *
 * @param {INepaliDate} nepaliDate - The Nepali date object to be formatted.
 * @param {string} format - The format string for the desired output.
 * @returns {string} - A string representation of the NepaliDate object in the specified format.
 */
export const formatEnglishDateInNepali = (
    nepaliDate: INepaliDate,
    format: string
): string => formatDate(nepaliDate, format, LOCALE_NE)
