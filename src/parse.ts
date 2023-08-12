/**
 * parse.ts
 *
 * This module provides methods for parsing dates and times from strings.
 *
 * Functions:
 *
 * parse(dateTimeString)
 * - Parses date and time from the given string.
 *
 * Further extension is needed in this module as there are limited formats supported for parsing.
 * Developers should consider extending the module to support additional date and time formats.
 */

import {
    MONTHS_EN,
    MONTHS_SHORT_EN,
    WEEKDAYS_LONG_EN,
    WEEKDAYS_SHORT_EN,
} from './constants'
import { parseFormatTokens, seqToRE } from './utils'

/**
 * Parses date from the given string.
 *
 * Supported formats are:
 * YYYY-MM-DD,
 * YYYY.MM.DD,
 * YYYY/MM/DD
 *
 * @param dateString date string to be parsed.
 * @throws {Error} if date string is invalid
 * @returns return array of date information [year, month0, day].
 */
function parseDateString(dateString: string): number[] {
    // Expected date formats are yyyy-mm-dd, yyyy.mm.dd yyyy/mm/dd
    const parts: string[] = dateString.split(/[-./]/, 3)
    const [year, month = 1, day = 1] = parts.map(d => {
        const n = parseInt(d, 10)
        if (Number.isNaN(n)) {
            throw new Error('Invalid date')
        }
        return n
    })

    return [year, month - 1, day]
}

/**
 * Parses time from the given string.
 *
 * Supported formats are:
 * HH:mm,
 * HH:mm:ss,
 * HH:mm:ss:SSS
 *
 * @param timeString time string to be parsed.
 * @throws {Error} if time string is invalid
 * @returns return array of date information [hour, minute, second, ms].
 */
function parseTimeString(timeString: string): number[] {
    if (!timeString) return [0, 0, 0, 0]

    // fetching milliseconds first
    const [hmsString, msString = '0'] = timeString.split('.', 2)

    const parts: string[] = hmsString.split(':', 3)
    const [hour, minute = 0, second = 0] = parts.map(d => {
        const n = parseInt(d, 10)
        if (Number.isNaN(n)) {
            throw new Error('Invalid time')
        }
        return n
    })

    // converting milliseconds into numbers
    let ms = parseInt(msString, 10)
    if (Number.isNaN(ms)) ms = 0

    return [hour, minute, second, ms]
}

/**
 * Parses date and time from the given string.
 *
 * Supported formats are:
 * YYYY-MM-DD HH[:mm][:ss][:SSS],
 * YYYY.MM.DD HH[:mm][:ss][:SSS],
 * YYYY/MM/DD HH[:mm][:ss][:SSS]
 *
 * @param dateTimeString time string to be parsed.
 * @throws {Error} if date or time string is invalid
 * @returns return array of date information [hour, minute, second, ms].
 */
export function parse(dateTimeString: string): number[] {
    const [dateString, timeString] = dateTimeString.split(' ', 2)
    const [year, month0, day] = parseDateString(dateString)
    const [hour, minute, second, ms] = parseTimeString(timeString)
    return [year, month0, day, hour, minute, second, ms]
}

/* parse v2 */

const TOKEN_TO_REGEX: { [key: string]: RegExp } = {
    YY: /(\d\d)/,
    YYYY: /(\d\d\d\d)/,
    M: /(1[0-2]|0[1-9]|[1-9])/,
    MM: /(1[0-2]|0[1-9]|[1-9])/,
    D: /(3[0-2]|[1-2]\d|0[1-9]|[1-9]| [1-9])/,
    DD: /(3[0-2]|[1-2]\d|0[1-9]|[1-9]| [1-9])/,
    H: /(2[0-3]|[0-1]\d|\d)/,
    HH: /(2[0-3]|[0-1]\d|\d)/,
    hh: /(1[0-2]|0[1-9]|[1-9])/,
    mm: /([0-5]\d|\d)/,
    ss: /([0-5]\d|\d)/,
    SSS: /(\d\d\d)/,
    A: /(AM|PM)/,
    a: /(am|pm)/,
    MMMM: seqToRE(MONTHS_EN),
    MMM: seqToRE(MONTHS_SHORT_EN),
    dddd: seqToRE(WEEKDAYS_LONG_EN),
    ddd: seqToRE(WEEKDAYS_SHORT_EN),
    dd: seqToRE(WEEKDAYS_SHORT_EN),
    d: /([0-6])/,
}

function tokensToRegex(arr: string[]): { dateTokens: string[]; regex: RegExp } {
    const dateTokens: string[] = []
    const regexParts: string[] = []

    for (const token of arr) {
        if (token in TOKEN_TO_REGEX) {
            dateTokens.push(token)
            regexParts.push(TOKEN_TO_REGEX[token].source)
        } else {
            regexParts.push(token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
        }
    }

    const regexString = regexParts.join('')

    return {
        dateTokens,
        regex: new RegExp(`^${regexString}$`),
    }
}

function getDateParams(
    dateTokens: string[],
    match: RegExpMatchArray
): { [key: string]: number } {
    // month and day are set to 1 in default
    let [year, month, day, hour, hour12, minute, second, ms] = [0, 1, 1, 0, 0, 0, 0, 0]
    let isPM = false
    let is12hourFormat = false

    for (let i = 0; i < dateTokens.length; i++) {
        const token = dateTokens[i]
        const matchData = parseInt(match[i + 1])
        switch (token) {
            case 'YYYY':
                year = matchData
                break
            case 'YY':
                year = 2000 + parseInt(match[i])
                break
            case 'MM':
            case 'M':
                month = matchData
                break
            case 'MMMM':
                month = MONTHS_EN.indexOf(match[i + 1]) + 1
                break
            case 'MMM':
                month = MONTHS_SHORT_EN.indexOf(match[i + 1]) + 1
                break
            case 'DD':
            case 'D':
                day = matchData
                break
            case 'HH':
            case 'H':
                hour = matchData
                break
            case 'hh':
            case 'h':
                hour12 = matchData
                is12hourFormat = true
                break
            case 'mm':
            case 'm':
                minute = matchData
                break
            case 'ss':
            case 's':
                second = matchData
                break
            case 'SSS':
                ms = matchData
                break
            case 'A':
            case 'a':
                isPM = (match[i + 1] as string).toLowerCase() === 'pm'
        }
    }

    if (is12hourFormat) {
        hour = hour12 + (isPM ? 12 : 0)
    }

    return {
        year,
        month0: month - 1,
        day,
        hour,
        minute,
        second,
        ms,
    }
}

export function parseFormat(dateString: string, format: string): number[] {
    const formatTokens = parseFormatTokens(format)
    const { dateTokens, regex: formatRegex } = tokensToRegex(formatTokens)
    const match = dateString.match(formatRegex)
    if (!match) {
        throw new Error('Invalid date format')
    }

    const { year, month0, day, hour, minute, second, ms } = getDateParams(
        dateTokens,
        match
    )
    return [year, month0, day, hour, minute, second, ms]
}
