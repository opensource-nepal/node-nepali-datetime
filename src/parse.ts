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
function parseDate(dateString: string): number[] {
    // Expected date formats are yyyy-mm-dd, yyyy.mm.dd yyyy/mm/dd
    const parts: string[] = dateString.split(/[-./]/, 3)
    const [year, month = 1, day = 1] = parts.map((d) => {
        const n = parseInt(d, 10)
        if (Number.isNaN(n)) {
            throw new Error("Invalid date")
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
function parseTime(timeString: string): number[] {
    if (!timeString)
        return [0, 0, 0, 0]

    const parts: string[] = timeString.split(":", 4)
    const [hour = 0, minute = 0, second = 0, ms = 0] = parts.map((d) => {
        const n = parseInt(d, 10)
        if (Number.isNaN(n)) {
            throw new Error("Invalid time")
        }
        return n
    })
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
function parse(dateTimeString: string): number[] {
    const [dateString, timeString] = dateTimeString.split(" ", 2)
    const [year, month0, day] = parseDate(dateString)
    const [hour, minute, second, ms] = parseTime(timeString)
    return [
        year, month0, day,
        hour, minute, second, ms
    ]
}

export default parse