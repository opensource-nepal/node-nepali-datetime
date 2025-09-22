import { getNepalDateAndTime } from './utils'

/**
 * Represents a Gregorian date/time in Nepal's timezone (Asia/Kathmandu, UTC+05:45).
 * Behaves like a JavaScript `Date` object, with all getters returning values in Nepal's timezone.
 * Does not convert to the Nepali (Bikram Sambat) calendar.
 *
 * @example
 *
 * // Current date/time in Nepal timezone
 * const date = new NepalTimezoneDate();
 * date.getYear();      // Returns 2025
 * date.getMinutes();   // Returns current minutes in Nepal timezone
 * date.toString();     // Returns e.g., "2025-09-01 16:01:00 GMT+0545"
 *
 * @example
 *
 * // From a specific UTC date
 * const date = new NepalTimezoneDate('2024-12-28T15:00:35Z');
 * date.toString();     // Returns "2024-12-28 20:45:35 GMT+0545"
 */
class NepalTimezoneDate {
    private _date: Date

    /**
     * Creates a NepalTimezoneDate instance for Asia/Kathmandu timezone (UTC+05:45).
     * Accepts the same arguments as the JavaScript `Date` constructor.
     *
     * @param args - Arguments compatible with the `Date` constructor (e.g., timestamp, string, or year/month/day).
     * @example
     *
     * const now = new NepalTimezoneDate(); // Current date/time in Nepal timezone
     * const specific = new NepalTimezoneDate(2024, 11, 28, 15, 0, 35); // 2024-12-28 15:00:35 UTC
     * const fromString = new NepalTimezoneDate('2024-12-28T15:00:35Z'); // From ISO string
     * const fromTimestamp = new NepalTimezoneDate(1703766035170); // From timestamp
     */
    constructor(...args: ConstructorParameters<typeof Date>) {
        this._date = new Date(...args)
    }

    /**
     * Returns the four-digit year in Nepal timezone (Asia/Kathmandu, UTC+05:45).
     *
     * @returns The year (e.g., 2024).
     * @example
     *
     * const date = new NepalTimezoneDate('2024-12-28T15:00:35Z');
     * date.getYear(); // Returns 2024
     */
    getYear(): number {
        return getNepalDateAndTime(this._date).year
    }

    /**
     * Returns the month index (0-11) in Nepal timezone (Asia/Kathmandu, UTC+05:45).
     *
     * @returns The month index (0 = January, 11 = December).
     * @example
     *
     * const date = new NepalTimezoneDate('2024-12-28T15:00:35Z');
     * date.getMonth(); // Returns 11
     */
    getMonth(): number {
        return getNepalDateAndTime(this._date).month0
    }

    /**
     * Returns the day of the month (1-31) in Nepal timezone (Asia/Kathmandu, UTC+05:45).
     *
     * @returns The day of the month.
     * @example
     *
     * const date = new NepalTimezoneDate('2024-12-28T15:00:35Z');
     * date.getDate(); // Returns 28
     */
    getDate(): number {
        return getNepalDateAndTime(this._date).day
    }

    /**
     * Returns the hour (0-23) in Nepal timezone (Asia/Kathmandu, UTC+05:45).
     *
     * @returns The hour of the day.
     * @example
     *
     * const date = new NepalTimezoneDate('2024-12-28T15:00:35Z');
     * date.getHours(); // Returns 20
     */
    getHours(): number {
        return getNepalDateAndTime(this._date).hour
    }

    /**
     * Returns the minute (0-59) in Nepal timezone (Asia/Kathmandu, UTC+05:45).
     *
     * @returns The minute of the hour.
     * @example
     *
     * const date = new NepalTimezoneDate('2024-12-28T15:00:35Z');
     * date.getMinutes(); // Returns 45
     */
    getMinutes(): number {
        return getNepalDateAndTime(this._date).minute
    }

    /**
     * Returns the second (0-59) in Nepal timezone (Asia/Kathmandu, UTC+05:45).
     *
     * @returns The second of the minute.
     * @example
     *
     * const date = new NepalTimezoneDate('2024-12-28T15:00:35Z');
     * date.getSeconds(); // Returns 35
     */
    getSeconds(): number {
        return getNepalDateAndTime(this._date).second
    }

    /**
     * Returns the millisecond (0-999) in Nepal timezone (Asia/Kathmandu, UTC+05:45).
     *
     * @returns The millisecond of the second.
     * @example
     *
     * const date = new NepalTimezoneDate('2024-12-28T15:00:35.170Z');
     * date.getMilliseconds(); // Returns 170
     */
    getMilliseconds(): number {
        return getNepalDateAndTime(this._date).ms
    }

    /**
     * Returns the day of the week (0-6, Sunday-Saturday) in Nepal timezone (Asia/Kathmandu, UTC+05:45).
     *
     * @returns The day of the week (0 = Sunday, 6 = Saturday).
     * @example
     *
     * const date = new NepalTimezoneDate('2024-12-28T15:00:35Z');
     * date.getDay(); // Returns 6 (Saturday)
     */
    getDay(): number {
        return getNepalDateAndTime(this._date).weekDay
    }

    /**
     * Returns the Unix timestamp (milliseconds since epoch, UTC).
     *
     * @returns The timestamp in milliseconds.
     * @example
     *
     * const date = new NepalTimezoneDate('2024-12-28T15:00:35Z');
     * date.getTime(); // Returns 1703766035000
     */
    getTime(): number {
        return this._date.getTime()
    }

    /**
     * Returns a formatted string in Nepal timezone (Asia/Kathmandu, UTC+05:45).
     * Format: `YYYY-MM-DD HH:mm:ss GMT+0545`
     *
     * @returns A string representing the date and time in Nepal timezone.
     * @example
     *
     * const date = new NepalTimezoneDate('2024-12-28T15:00:35Z');
     * date.toString(); // Returns "2024-12-28 20:45:35 GMT+0545"
     */
    toString(): string {
        const np = getNepalDateAndTime(this._date)
        return (
            `${np.year}-${String(np.month0 + 1).padStart(2, '0')}-${String(np.day).padStart(2, '0')} ` +
            `${String(np.hour).padStart(2, '0')}:${String(np.minute).padStart(2, '0')}:${String(np.second).padStart(2, '0')} GMT+0545`
        )
    }

    /**
     * Returns a copy of the underlying JavaScript `Date` object.
     *
     * @returns A new `Date` instance with the same timestamp.
     * @example
     *
     * const date = new NepalTimezoneDate('2024-12-28T15:00:35Z');
     * const jsDate = date.toDate(); // Returns Date object for 2024-12-28T15:00:35Z
     */
    toDate(): Date {
        return new Date(this._date)
    }
}

export default NepalTimezoneDate
