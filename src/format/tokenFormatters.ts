import {
    ENGLISH_MONTHS_EN,
    ENGLISH_MONTHS_NE,
    ENGLISH_MONTHS_SHORT_EN,
    ENGLISH_MONTHS_SHORT_NE,
    LOCALE_EN,
    LOCALE_NE,
    NEPALI_MONTHS_EN,
    NEPALI_MONTHS_NE,
    NEPALI_MONTHS_SHORT_EN,
    NEPALI_MONTHS_SHORT_NE,
    NUM_NE,
    WEEKDAYS_LONG_EN,
    WEEKDAYS_LONG_NE,
    WEEKDAYS_SHORT_EN,
    WEEKDAYS_SHORT_NE,
} from '../constants'

export interface INepaliDate {
    getDateObject(): Date
    getYear(): number
    getEnglishYear(): number
    getMonth(): number
    getEnglishMonth(): number
    getDate(): number
    getEnglishDate(): number
    getDay(): number
    getHours(): number
    getMinutes(): number
    getSeconds(): number
    getMilliseconds(): number
    getTime(): number
}

export type Locale = typeof LOCALE_EN | typeof LOCALE_NE

export interface Formatter {
    (nepaliDate: INepaliDate, locale: Locale): string
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
export const zeroPad = (value: number) => value.toString().padStart(2, '0')

/**
 * Pads a number with a leading zero if it is less than 100.
 *
 * Output: 1 => 001, 11 => 011, 111 => 111
 *
 * @param value - The number to be padded.
 * @returns The padded number as a string.
 */
export const millisecondZeroPad = (value: number) => value.toString().padStart(3, '0')

/**
 * Converts English digits to Nepali digits (Devanagari script).
 *
 * @param {string} str - English digits in string format.
 * @returns {string} Nepali digits in string format.
 */
const npDigit = (str: string): string => {
    return str
        .split('')
        .map(chr => NUM_NE[chr.charCodeAt(0) - 48])
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

export const halfNepaliYear: Formatter = (nepaliDate, locale) =>
    localizedNumberString(nepaliDate.getYear(), locale).substring(2)

export const fullNepaliYear: Formatter = (nepaliDate, locale) =>
    localizedNumberString(nepaliDate.getYear(), locale)

export const halfEnglishYear: Formatter = (nepaliDate, locale) =>
    localizedNumberString(nepaliDate.getEnglishYear(), locale).substring(2)

export const fullEnglishYear: Formatter = (nepaliDate, locale) =>
    localizedNumberString(nepaliDate.getEnglishYear(), locale)

export const nepaliMonthNumber: Formatter = (nepaliDate, locale) =>
    localizedNumberString(nepaliDate.getMonth() + 1, locale)

export const nepaliMonthTwoDigit: Formatter = (nepaliDate, locale) =>
    localizedNumberString(zeroPad(nepaliDate.getMonth() + 1), locale)

export const nepaliMonthAbbrName: Formatter = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return NEPALI_MONTHS_SHORT_NE[nepaliDate.getMonth()]
    }
    return NEPALI_MONTHS_SHORT_EN[nepaliDate.getMonth()]
}

export const nepaliMonthFullName: Formatter = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return NEPALI_MONTHS_NE[nepaliDate.getMonth()]
    }
    return NEPALI_MONTHS_EN[nepaliDate.getMonth()]
}

export const englishMonthNumber: Formatter = (nepaliDate, locale) =>
    localizedNumberString(nepaliDate.getEnglishMonth() + 1, locale)

export const englishMonthTwoDigit: Formatter = (nepaliDate, locale) =>
    localizedNumberString(zeroPad(nepaliDate.getEnglishMonth() + 1), locale)

export const englishMonthAbbrName: Formatter = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return ENGLISH_MONTHS_SHORT_NE[nepaliDate.getEnglishMonth()]
    }
    return ENGLISH_MONTHS_SHORT_EN[nepaliDate.getEnglishMonth()]
}

export const englishMonthFullName: Formatter = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return ENGLISH_MONTHS_NE[nepaliDate.getEnglishMonth()]
    }
    return ENGLISH_MONTHS_EN[nepaliDate.getEnglishMonth()]
}

export const nepaliDayNumber: Formatter = (nepaliDate, locale) =>
    localizedNumberString(nepaliDate.getDate(), locale)

export const nepaliDayTwoDigit: Formatter = (nepaliDate, locale) =>
    localizedNumberString(zeroPad(nepaliDate.getDate()), locale)

export const englishDayNumber: Formatter = (nepaliDate, locale) =>
    localizedNumberString(nepaliDate.getEnglishDate(), locale)

export const englishDayTwoDigit: Formatter = (nepaliDate, locale) =>
    localizedNumberString(zeroPad(nepaliDate.getEnglishDate()), locale)

export const weekDayNumber: Formatter = (nepaliDate, locale) =>
    localizedNumberString(nepaliDate.getDay(), locale)

export const weekDayShortName: Formatter = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return WEEKDAYS_SHORT_NE[nepaliDate.getDay()]
    }
    return WEEKDAYS_SHORT_EN[nepaliDate.getDay()]
}

export const weekDayFullName: Formatter = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return WEEKDAYS_LONG_NE[nepaliDate.getDay()]
    }
    return WEEKDAYS_LONG_EN[nepaliDate.getDay()]
}

export const hour24Number: Formatter = (nepaliDate, locale) =>
    localizedNumberString(nepaliDate.getHours(), locale)

export const hour24TwoDigit: Formatter = (nepaliDate, locale) =>
    localizedNumberString(zeroPad(nepaliDate.getHours()), locale)

export const hour12Number: Formatter = (nepaliDate, locale) => {
    const hour24 = nepaliDate.getHours()
    const hour = hour24 > 12 ? hour24 - 12 : hour24
    return localizedNumberString(hour, locale)
}

export const hour12TwoDigit: Formatter = (nepaliDate, locale) => {
    const hour24 = nepaliDate.getHours()
    const hour = hour24 > 12 ? hour24 - 12 : hour24
    return localizedNumberString(zeroPad(hour), locale)
}

export const minuteNumber: Formatter = (nepaliDate, locale) =>
    localizedNumberString(nepaliDate.getMinutes(), locale)

export const minuteTwoDigit: Formatter = (nepaliDate, locale) =>
    localizedNumberString(zeroPad(nepaliDate.getMinutes()), locale)

export const secondNumber: Formatter = (nepaliDate, locale) =>
    localizedNumberString(nepaliDate.getSeconds(), locale)

export const secondTwoDigit: Formatter = (nepaliDate, locale) =>
    localizedNumberString(zeroPad(nepaliDate.getSeconds()), locale)

export const millisecondThreeDigit: Formatter = (nepaliDate, locale) =>
    localizedNumberString(millisecondZeroPad(nepaliDate.getMilliseconds()), locale)

export const amPmUpperCase: Formatter = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return nepaliDate.getHours() >= 12 ? 'पिम' : 'एम'
    }
    return nepaliDate.getHours() >= 12 ? 'PM' : 'AM'
}

export const amPmLowerCase: Formatter = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return nepaliDate.getHours() >= 12 ? 'पिम' : 'एम'
    }
    return nepaliDate.getHours() >= 12 ? 'pm' : 'am'
}
