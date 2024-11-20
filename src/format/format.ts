import { LOCALE_EN, LOCALE_NE } from '../constants'
import { parseFormatTokens } from '../utils'
import {
    amPmLowerCase,
    amPmUpperCase,
    Formatter,
    fullNepaliYear,
    halfNepaliYear,
    hour12Number,
    hour12TwoDigit,
    hour24Number,
    hour24TwoDigit,
    INepaliDate,
    Locale,
    millisecondThreeDigit,
    millisecondZeroPad,
    minuteNumber,
    minuteTwoDigit,
    nepaliDayNumber,
    nepaliDayTwoDigit,
    nepaliMonthAbbrName,
    nepaliMonthFullName,
    nepaliMonthNumber,
    nepaliMonthTwoDigit,
    secondNumber,
    secondTwoDigit,
    weekDayFullName,
    weekDayNumber,
    weekDayShortName,
    zeroPad,
} from './tokenFormatters'

const TOKENS_TO_FORMATTER: { [key: string]: Formatter } = {
    YY: halfNepaliYear,
    YYYY: fullNepaliYear,
    M: nepaliMonthNumber,
    MM: nepaliMonthTwoDigit,
    MMM: nepaliMonthAbbrName,
    MMMM: nepaliMonthFullName,
    D: nepaliDayNumber,
    DD: nepaliDayTwoDigit,
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
 * Returns a string representation (in English) of the NepaliDate object in the specified format.
 *
 * @param {INepaliDate} nepaliDate - The Nepali date object to be formatted.
 * @param {string} format - The format string for the desired output.
 * @returns {string} - The formatted Nepali date string.
 */
export const format = (nepaliDate: INepaliDate, format: string): string =>
    formatDate(nepaliDate, format, LOCALE_EN)

/**
 * Returns a string representation in the Nepali (Devanagari) of the NepaliDate object in the specified format.
 *
 * @param {INepaliDate} nepaliDate - The Nepali date object to be formatted.
 * @param {string} format - The format string for the desired output.
 * @returns {string} - A string representation of the NepaliDate object in the specified format.
 */
export const formatNepali = (nepaliDate: INepaliDate, format: string): string =>
    formatDate(nepaliDate, format, LOCALE_NE)

/**
 * Converts a NepaliDate object to a toString() representation.
 * Returns in format "YYYY-MM-DD HH:mm:ss[.SSS]".
 * This method is lightweight compared to the format/formatNepali method.
 *
 * @param {INepaliDate} nepaliDate - The NepaliDate object to be converted.
 * @returns {string} The formatted string representation of the NepaliDate.
 */
export const nepaliDateToString = (nepaliDate: INepaliDate): string => {
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
