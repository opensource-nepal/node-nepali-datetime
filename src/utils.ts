import {
    FORMAT_TOKEN_REGEX,
    OLD_UTC_OFFSET_IN_MS,
    TIMEZONE_TRANSITION_TIMESTAMP,
    TIMEZONE_TRANSITION_DATE_REFERENCE,
    UTC_OFFSET_IN_MS,
} from './constants'

/**
 * Get the Nepali date and time components (Gregorian calendar) from a given date.
 * The input can be any date from any timezone, it is converted into the Nepal's timezone (Asia/Kathmandu).
 *
 * @param date - The input date for which to retrieve the Nepali date and time.
 * @returns An object containing the Nepali date and time components.
 */
export const getNepalDateAndTime = (
    date: Date
): {
    year: number
    month0: number
    day: number
    hour: number
    minute: number
    second: number
    ms: number
    weekDay: number
} => {
    const time = date.getTime()

    // Handling the timezone switch from GMT+5:30 to GMT+5:45
    // In javascript the switched time is
    // 504901800000: Wed Jan 01 1986 00:15:00 GMT+0545 (Nepal Time) : Adjusted time
    const utcOffsetInMs =
        time < TIMEZONE_TRANSITION_TIMESTAMP ? OLD_UTC_OFFSET_IN_MS : UTC_OFFSET_IN_MS

    // Calculate the Nepali reference date by adding the offset to the input date's unix timestamp
    const nepaliRefDate = new Date(time + utcOffsetInMs)

    // Extract the Nepali date and time components
    const npYear = nepaliRefDate.getUTCFullYear()
    const npMonth0 = nepaliRefDate.getUTCMonth()
    const npDay = nepaliRefDate.getUTCDate()
    const npHour = nepaliRefDate.getUTCHours()
    const npMinutes = nepaliRefDate.getUTCMinutes()
    const npSeconds = nepaliRefDate.getUTCSeconds()
    const npMs = nepaliRefDate.getUTCMilliseconds()
    const npWeekDay = nepaliRefDate.getUTCDay()

    // Return the Nepali date and time components as an object
    return {
        year: npYear,
        month0: npMonth0,
        day: npDay,
        hour: npHour,
        minute: npMinutes,
        second: npSeconds,
        ms: npMs,
        weekDay: npWeekDay,
    }
}

/**
 * Get the Date object from the given Nepali date and time components.
 *
 * @param year - The year component of the Nepali date.
 * @param month0 - The month component of the Nepali date (1-12).
 * @param date - The day component of the Nepali date.
 * @param hour - The hour component of the Nepali time.
 * @param minute - The minute component of the Nepali time.
 * @param second - The second component of the Nepali time.
 * @param ms - The millisecond component of the Nepali time.
 * @returns A `Date` object representing the UTC date and time.
 */
export const getDate = (
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    second: number,
    ms: number
): Date => {
    // Create a new Date object using the given Nepali date and time parameters
    const nepaliRefDate = new Date(year, month, day, hour, minute, second, ms)

    let utcOffsetInMs =
        nepaliRefDate < TIMEZONE_TRANSITION_DATE_REFERENCE
            ? OLD_UTC_OFFSET_IN_MS
            : UTC_OFFSET_IN_MS

    // Getting current timezone offset (in milliseconds)
    const currentOffsetInMS = -1 * nepaliRefDate.getTimezoneOffset() * 60 * 1000

    // Subtracting Nepali ref date by Nepali timezone offset and current timezone Offset
    const date = new Date(nepaliRefDate.getTime() - utcOffsetInMs + currentOffsetInMS)

    // Return the date object
    return date
}

/**
 * Parses a format string and extracts individual format tokens.
 *
 * The format string can contain various tokens, which are represented
 * by certain characters or character sequences. Tokens can be single
 * characters, multiple characters, or character sequences enclosed within
 * square brackets.
 *
 * @param {string} format - The format string to be parsed.
 * @returns {string[]} - An array of parsed tokens.
 *    Each element in the array represents a single token extracted from the format string.
 *
 * @example
 * const formatString = 'YYYY-MM-DD';
 * const parsedTokens = parseFormatTokens(formatString);
 * // Output: ['YYYY', '-', 'MM', '-', 'DD']
 *
 * @example
 * const formatString = "YYYY 'ello DD";
 * const parsedTokens = parseFormatTokens(formatString);
 * // Output: ['YYYY', " 'ello ", 'DD']
 */

export const parseFormatTokens = (format: string): string[] => {
    const tokens: RegExpMatchArray | null = format.match(FORMAT_TOKEN_REGEX)
    if (!tokens) return []

    return tokens.map(token => {
        return token.startsWith('[') && token.endsWith(']') ? token.slice(1, -1) : token
    })
}


/**
 * Converts a list of strings to a regex string.
 * It takes possible matching values to be from longest to shortest.  This
 * prevents the possibility of a match occurring for a value that also
 * a substring of a larger value that should have matched (e.g., 'abc'
 * matching when 'abcdef' should have been the match).
 *
 * @param toConvert - An array of string containing all the required regex values
 */
export const seqToRE = (toConvert: Array<string>): RegExp => {
    toConvert = toConvert.sort((a, b) => b.length - a.length)

    for (let value of toConvert) {
        if (value != "") {
            break
        } else {
            return new RegExp("")
        }
    }

    const regexString = `(${toConvert.join('|')})`

    return new RegExp(regexString)
}
