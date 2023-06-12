import { UTC_OFFSET_IN_MS } from "./constants"

/**
 * Get the Nepali date and time components (Gregorian calendar) from a given date.
 * The input can be any date from any timezone, it is converted into the Nepal's timezone (Asia/Kathmandu).
 *
 * @param date - The input date for which to retrieve the Nepali date and time.
 * @returns An object containing the Nepali date and time components.
 */
export const getNepalDateAndTime = (date: Date): {
    year: number
    month0: number
    day: number
    hour: number
    minute: number
    second: number
    ms: number
    weekDay: number
} => {
    // Calculate the Nepali reference date by adding the offset to the input date's unix timestamp
    const nepaliRefDate = new Date(date.getTime() + UTC_OFFSET_IN_MS)

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
export const getDate = (year: number, month: number, day: number,
    hour: number, minute: number, second: number, ms: number): Date => {

    // Create a new Date object using the given Nepali date and time parameters
    const nepaliRefDate = new Date(year, month, day, hour, minute, second, ms)

    // getting current timezone offset (in milliseconds)
    const currentOffsetInMS = -1 * new Date().getTimezoneOffset() * 60 * 1000

    // Subtracting Nepali ref date by Nepali timezone offset and current timezone Offset
    const date = new Date(nepaliRefDate.getTime() - UTC_OFFSET_IN_MS + currentOffsetInMS)

    // Return the date object
    return date
}


