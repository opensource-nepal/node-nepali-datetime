import {
    OLD_UTC_OFFSET_IN_MS,
    TIMEZONE_TRANSITION_DATE_REFERENCE,
    TIMEZONE_TRANSITION_TIMESTAMP,
    UTC_OFFSET_IN_MS,
} from './constants'

/**
 * Represents a Gregorian date/time in Nepal's timezone (Asia/Kathmandu, UTC+05:45).
 * Behaves like a JavaScript `Date` object, with all getters returning values in Nepal's timezone.
 * Does not convert to the Nepali (Bikram Sambat) calendar.
 *
 * @example
 * const date = new NepalTimezoneDate();
 * or,
 * const date = new NepalTimezoneDate(2024, 11, 28, 20, 45, 35) // 20:45 is Nepal time
 * date.toString() // "2024-12-28 20:45:35 GMT+0545"
 * date.toDate()   // JS Date object in UTC
 *
 * @example
 * const date = new NepalTimezoneDate(new Date())
 * date.getYear() // Nepal year
 * date.getMinutes() // Nepal minutes
 */
class NepalTimezoneDate {
    private _date: Date
    private _nepalTimezoneSafeDate: {
        year: number
        month0: number
        day: number
        hour: number
        minute: number
        second: number
        ms: number
        weekDay: number
    }

    /**
     * Get the Nepali date and time components (Gregorian calendar) from a given date.
     * The input can be any date from any timezone, it is converted into the Nepal's timezone (Asia/Kathmandu).
     *
     * @param date - The input date for which to retrieve the Nepali date and time.
     * @returns An object containing the Nepali date and time components.
     */
    private static getNepalDateAndTime(date: Date) {
        const time = date.getTime()

        // Handling the timezone switch froqm GMT+5:30 to GMT+5:45
        // In javascript the switched time is
        // 504901800000: Wed Jan 01 1986 00:15:00 GMT+0545 (Nepal Time) : Adjusted time
        const utcOffsetInMs =
            time < TIMEZONE_TRANSITION_TIMESTAMP
                ? OLD_UTC_OFFSET_IN_MS
                : UTC_OFFSET_IN_MS

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
    private static getDate(
        year: number,
        month: number,
        day: number,
        hour: number,
        minute: number,
        second: number,
        ms: number
    ): Date {
        // Create a new Date object using the given Nepali date and time parameters
        const nepaliRefDate = new Date(year, month, day, hour, minute, second, ms)

        let utcOffsetInMs =
            nepaliRefDate < TIMEZONE_TRANSITION_DATE_REFERENCE
                ? OLD_UTC_OFFSET_IN_MS
                : UTC_OFFSET_IN_MS

        // Getting current timezone offset (in milliseconds)
        const currentOffsetInMS = -1 * nepaliRefDate.getTimezoneOffset() * 60 * 1000

        // Subtracting Nepali ref date by Nepali timezone offset and current timezone Offset
        const date = new Date(
            nepaliRefDate.getTime() - utcOffsetInMs + currentOffsetInMS
        )

        // Return the date object
        return date
    }

    /**
     * Creates a NepalTimezoneDate instance for Asia/Kathmandu timezone (UTC+05:45).
     * Accepts:
     *   - No arguments (current date/time)
     *   - Unix epoch (number)
     *   - Date object
     *   - year, month, ... (Nepal timezone components)
     */
    constructor(...args: any[]) {
        if (args.length === 0) {
            // no arguments - current date/time
            this._date = new Date()
        } else if (args.length === 1 && typeof args[0] === 'number') {
            // Unix epoch (ms)
            this._date = new Date(args[0])
        } else if (args.length === 1 && args[0] instanceof Date) {
            // Date object
            this._date = new Date(args[0])
        } else if (
            args.length >= 2 &&
            args.length <= 7 &&
            args.every(arg => typeof arg === 'number')
        ) {
            // year, month, day, hour, minute, second, ms (Nepal timezone components)
            const [year, month, day, hour = 0, minute = 0, second = 0, ms = 0] = args
            this._date = NepalTimezoneDate.getDate(
                year,
                month,
                day,
                hour,
                minute,
                second,
                ms
            )
        } else {
            throw new Error('Invalid arguments for NepalTimezoneDate')
        }
        this._nepalTimezoneSafeDate = NepalTimezoneDate.getNepalDateAndTime(this._date)
    }

    /**
     * Retrieves the year in Nepal's timezone (Gregorian calendar).
     * @returns {number} The full numeric value representing the year
     */
    getYear(): number {
        return this._nepalTimezoneSafeDate.year
    }

    /**
     * Retrieves the month in Nepal's timezone (Gregorian calendar).
     * @returns {number} The numeric value representing the month
     */
    getMonth(): number {
        return this._nepalTimezoneSafeDate.month0
    }

    /**
     * Retrieves the day of the month in Nepal's timezone (Gregorian calendar).
     * @returns {number} The numeric value representing the day of the month.
     */
    getDate(): number {
        return this._nepalTimezoneSafeDate.day
    }

    /**
     * Retrieves the hour in Nepal's timezone.
     * @returns {number} The numeric value representing the hour
     */
    getHours(): number {
        return this._nepalTimezoneSafeDate.hour
    }

    /**
     * Retrieves the minute in Nepal's timezone.
     * @returns {number} The numeric value representing the minute
     */
    getMinutes(): number {
        return this._nepalTimezoneSafeDate.minute
    }

    /**
     * Retrieves the second in Nepal's timezone.
     * @returns {number} The numeric value representing the second
     */
    getSeconds(): number {
        return this._nepalTimezoneSafeDate.second
    }

    /**
     * Retrieves the millisecond in Nepal's timezone.
     * @returns {number} The numeric value representing the millisecond
     */
    getMilliseconds(): number {
        return this._nepalTimezoneSafeDate.ms
    }

    /**
     * Retrieves the day of the week in Nepal's timezone.
     * @returns {number} The numeric value representing the day of the week
     */
    getDay(): number {
        return this._nepalTimezoneSafeDate.weekDay
    }

    /**
     * Retrieves the Unix timestamp (in milliseconds) of the date.
     * @returns {number} The numeric value representing the time in milliseconds.
     */
    getTime(): number {
        return this._date.getTime()
    }

    /**
     * Returns a string representation of the NepalTimezoneDate object in Nepal's timezone.
     * @returns {string} The string representation in the format "YYYY-MM-DD HH:mm:ss GMT+0545".
     */
    toString(): string {
        const np = this._nepalTimezoneSafeDate
        return (
            `${np.year}-${String(np.month0 + 1).padStart(2, '0')}-${String(np.day).padStart(2, '0')} ` +
            `${String(np.hour).padStart(2, '0')}:${String(np.minute).padStart(2, '0')}:${String(np.second).padStart(2, '0')} GMT+0545`
        )
    }

    /**
     * Returns the underlying Date object (UTC).
     * @returns {Date} The equivalent JavaScript Date object.
     */
    toDate(): Date {
        return new Date(this._date)
    }
}

export default NepalTimezoneDate
