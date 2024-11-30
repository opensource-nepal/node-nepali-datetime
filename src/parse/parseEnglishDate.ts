import {
    ENGLISH_MONTHS_EN,
    ENGLISH_MONTHS_SHORT_EN,
    WEEKDAYS_LONG_EN,
    WEEKDAYS_SHORT_EN,
} from '../constants'
import { parseFormatTokens, seqToRE } from '../utils'

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
    MMMM: seqToRE(ENGLISH_MONTHS_EN),
    MMM: seqToRE(ENGLISH_MONTHS_SHORT_EN),
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
                month = ENGLISH_MONTHS_EN.indexOf(match[i + 1]) + 1
                break
            case 'MMM':
                month = ENGLISH_MONTHS_SHORT_EN.indexOf(match[i + 1]) + 1
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
                isPM = match[i + 1].toLowerCase() === 'pm'
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

export function parseEnglishDateFormat(dateString: string, format: string): number[] {
    const formatTokens = parseFormatTokens(format)
    const { dateTokens, regex: formatRegex } = tokensToRegex(formatTokens)
    const match = RegExp(formatRegex).exec(dateString)
    if (!match) {
        throw new Error('Invalid date format')
    }

    const { year, month0, day, hour, minute, second, ms } = getDateParams(
        dateTokens,
        match
    )
    return [year, month0, day, hour, minute, second, ms]
}
