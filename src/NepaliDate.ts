import dateConverter from './dateConverter'
import { format, formatNepali, nepaliDateToString } from './format'
import { parse, parseFormat } from './parse'
import { getDate, getNepalDateAndTime } from './utils'
import { validateTime } from './validators'

/**
 * Represents a Nepali calendar date.
 */
class NepaliDate {
    timestamp: Date
    year: number
    yearEn: number
    month: number
    monthEn: number
    day: number
    dayEn: number
    hour: number
    minute: number
    weekDay: number
    static minimum: () => Date
    static maximum: () => Date

    /**
     * Creates a new NepaliDate object.
     *
     * @param args - The arguments to create the NepaliDate object.
     *
     * Examples Parameters:
     *   - No parameters: Creates a NepaliDate object for the current date and time.
     *     ```
     *     const now = new NepaliDate();
     *     ```
     *
     *   - Nepali date time string: Parses the string as a Nepali calendar date.
     *     ```
     *     const date1 = new NepaliDate('2079-02-15');
     *     const date2 = new NepaliDate('2079-02-15 14:00');
     *     ```
     *
     *   - Unix timestamp (in milliseconds):
     *     ```
     *     const date2 = new NepaliDate(1654210800000);
     *     ```
     *
     *   - Date object: Converts the JavaScript Date object to a NepaliDate object.
     *     ```
     *     const jsDate = new Date();
     *     const date3 = new NepaliDate(jsDate);
     *     ```
     *
     *   - NepaliDate object: Creates a new NepaliDate object with the same values.
     *     ```
     *     const date4 = new NepaliDate(date3);
     *     ```
     *
     *   - Nepali calendar date and time parameters: Specifies the components of a Nepali calendar date.
     *     ```
     *     const date5 = new NepaliDate(2079, 2, 15, 10, 30);
     *     ```
     *
     * @throws {Error} If an invalid date argument is provided.
     */
    constructor(...args: any[]) {
        if (args.length === 0) {
            this._setDateObject(new Date())
        } else if (args.length === 1) {
            const e = args[0]
            if (typeof e === 'object') {
                if (e instanceof Date) {
                    this._setDateObject(e)
                } else if (e instanceof NepaliDate) {
                    this.timestamp = e.timestamp
                    this.year = e.year
                    this.yearEn = e.yearEn
                    this.month = e.month
                    this.monthEn = e.monthEn
                    this.day = e.day
                    this.dayEn = e.dayEn
                    this.hour = e.hour
                    this.minute = e.minute
                    this.weekDay = e.weekDay
                } else {
                    throw new Error('Invalid date argument')
                }
            } else if (typeof e === 'number') {
                this._setDateObject(new Date(e))
            } else if (typeof e === 'string') {
                // Try to parse the date
                this.set.apply(this, parse(e))
            } else {
                throw new Error('Invalid date argument')
            }
        } else if (
            args.length === 2 &&
            typeof args[0] === 'string' &&
            typeof args[1] === 'string'
        ) {
            const [dateTimeString, format] = args
            this.set.apply(this, parseFormat(dateTimeString, format))
        } else {
            this.set(
                args[0], // year
                args[1], // month
                args[2] ?? 1, // day
                args[3] ?? 0, // hour
                args[4] ?? 0, // minute
                args[5] ?? 0, // second
                args[6] ?? 0 // ms
            )
        }
    }

    /**
     * Sets the English date and optionally computes the corresponding Nepali date.
     * Handles all the operations and variables while setting the English date.
     *
     * @param date The English date to set.
     * @param computeNepaliDate Flag indicating whether to compute the Nepali date. Default is `false`.
     * @returns void
     */
    private _setDateObject(date: Date, computeNepaliDate: boolean = true) {
        this.timestamp = date

        // getting Nepal's hour, minute, and weekDay
        const { year, month0, day, hour, minute, weekDay } = getNepalDateAndTime(date)
        this.yearEn = year
        this.monthEn = month0
        this.dayEn = day
        this.hour = hour
        this.minute = minute
        this.weekDay = weekDay

        if (computeNepaliDate) {
            const [yearNp, month0Np, dayNp] = dateConverter.englishToNepali(
                year,
                month0,
                day
            )
            this.year = yearNp
            this.month = month0Np
            this.day = dayNp
        }
    }

    /**
     * Retrieves the Date object equivalent to the NepaliDate.
     *
     * @returns {Date} The equivalent JavaScript Date object.
     */
    getDateObject() {
        return this.timestamp
    }

    /**
     * Retrieves the year of the Nepali date in the Nepali calendar.
     *
     * @returns {number} The full numeric value representing the year. Eg. 2080
     */
    getYear(): number {
        return this.year
    }

    /**
     * Retrieves the year of the Nepali date in the English calendar.
     *
     * @returns {number} The full numeric value representing the year. Eg. 2009
     */
    getEnglishYear(): number {
        return this.yearEn
    }

    /**
     * Retrieves the month of the Nepali date in the Nepali calendar.
     *
     * @returns {number} The numeric value representing the month. 0 for Baishakh and 11 for Chaitra.
     */
    getMonth(): number {
        return this.month
    }

    /**
     * Retrieves the month of the Nepali date in the English calendar.
     *
     * @returns {number} The numeric value representing the month. 0 for January and 11 for December.
     */
    getEnglishMonth(): number {
        return this.monthEn
    }

    /**
     * Retrieves the day of the month represented of Nepali date in Nepali calendar.
     *
     * @returns {number} The numeric value representing the day of the month.
     */
    getDate(): number {
        return this.day
    }

    /**
     * Retrieves the day of the month represented of Nepali date in English calendar.
     *
     * @returns {number} The numeric value representing the day of the month.
     */
    getEnglishDate(): number {
        return this.dayEn
    }

    /**
     * Retrieves the day of the week represented by a numeric value.
     *
     * @returns The numeric value representing the day of the week.
     *          0: Sunday
     *          1: Monday
     *          2: Tuesday
     *          3: Wednesday
     *          4: Thursday
     *          5: Friday
     *          6: Saturday
     */
    getDay(): number {
        return this.weekDay
    }

    /**
     * Retrieves the hour value of the Nepali date.
     *
     * @returns {number} The numeric value representing the hour.
     */
    getHours(): number {
        return this.hour
    }

    /**
     * Retrieves the minute value of the Nepali date.
     *
     * @returns {number} The numeric value representing the minute.
     */
    getMinutes(): number {
        return this.minute
    }

    /**
     * Retrieves the second value of the Nepali date.
     *
     * @returns {number} The numeric value representing the second.
     */
    getSeconds(): number {
        return this.timestamp.getSeconds()
    }

    /**
     * Retrieves the millisecond value of the Nepali date.
     *
     * @returns {number} The numeric value representing the millisecond.
     */
    getMilliseconds(): number {
        return this.timestamp.getMilliseconds()
    }

    /**
     * Retrieves the unix timestamp (in milliseconds) of the Nepali date.
     *
     * @returns {number} The numeric value representing the time in milliseconds.
     */
    getTime(): number {
        return this.timestamp.getTime()
    }

    /**
     * Sets the day on the current date and time
     *
     * @param {number} year - The numeric value representing the year.
     * @throws {ValidationError} if year is out of range
     */
    setYear(year: number) {
        this.set(
            year,
            this.month,
            this.day,
            this.hour,
            this.minute,
            this.timestamp.getSeconds(),
            this.timestamp.getMilliseconds()
        )
    }

    /**
     * Sets the day on the current date and time
     *
     * @param {number} month - The numeric value representing the month.
     * @throws {ValidationError} if month is out of range
     */
    setMonth(month: number) {
        this.set(
            this.year,
            month,
            this.day,
            this.hour,
            this.minute,
            this.timestamp.getSeconds(),
            this.timestamp.getMilliseconds()
        )
    }

    /**
     * Sets the day on the current date and time
     *
     * @param {number} day - The numeric value representing the day.
     * @throws {ValidationError} if day is out of range
     */
    setDate(day: number) {
        this.set(
            this.year,
            this.month,
            day,
            this.hour,
            this.minute,
            this.timestamp.getSeconds(),
            this.timestamp.getMilliseconds()
        )
    }

    /**
     * Sets hour on the current date and time
     *
     * @param hour Hour to set
     * @throws {ValidationError} if hour is out of range
     */
    setHours(hour: number) {
        this.set(
            this.year,
            this.month,
            this.day,
            hour,
            this.minute,
            this.timestamp.getSeconds(),
            this.timestamp.getMilliseconds()
        )
    }

    /**
     * Sets minute on the current date and time
     *
     * @param minute Minute to set
     * @throws {ValidationError} if minute is out of range
     */
    setMinutes(minute: number) {
        this.set(
            this.year,
            this.month,
            this.day,
            this.hour,
            minute,
            this.timestamp.getSeconds(),
            this.timestamp.getMilliseconds()
        )
    }

    /**
     * Sets second on the current date and time
     *
     * @param second Second to set
     * @throws {ValidationError} if second is out of range
     */
    setSeconds(second: number) {
        this.set(
            this.year,
            this.month,
            this.day,
            this.hour,
            this.minute,
            second,
            this.timestamp.getMilliseconds()
        )
    }

    /**
     * Sets milliseconds on the current date and time
     *
     * @param ms Milliseconds to set
     * @throws {ValidationError} if milliseconds is out of range
     */
    setMilliseconds(ms: number) {
        this.set(
            this.year,
            this.month,
            this.day,
            this.hour,
            this.minute,
            this.timestamp.getSeconds(),
            ms
        )
    }

    /**
     * Sets time on the object.
     *
     * @param time Time to set (timestamp)
     */
    setTime(time: number) {
        this._setDateObject(new Date(time))
    }

    /**
     * Sets the Nepali date and time values.
     *
     * @param {number} year - The numeric value representing the year.
     * @param {number} month - The numeric value representing the month.
     * @param {number} date - The numeric value representing the day.
     * @param {number} [hour=0] - The numeric value representing the hour.
     * @param {number} [minute=0] - The numeric value representing the minute.
     * @param {number} [second=0] - The numeric value representing the second.
     * @param {number} [ms=0] - The numeric value representing the millisecond.
     */
    set(
        year: number,
        month: number,
        date: number,
        hour: number,
        minute: number,
        second: number,
        ms: number
    ) {
        validateTime(hour, minute, second, ms)
        const [yearEn, month0EN, dayEn] = dateConverter.nepaliToEnglish(
            year,
            month,
            date
        )
        this.year = year
        this.month = month
        this.day = date
        this._setDateObject(
            getDate(yearEn, month0EN, dayEn, hour, minute, second, ms),
            false
        )
    }

    /**
     * Returns a string representation (in English) of the NepaliDate object in the specified format.
     *
     * @param {string} formatStr - The format string specifying the desired format.
     * @returns {string} The formatted Nepali date string.
     */
    format(formatStr: string): string {
        return format(this, formatStr)
    }

    /**
     * Returns a string representation in the Nepali (Devanagari) of the NepaliDate object in the specified format.
     * @param formatStr The format string for the desired output.
     * @returns {string} A string representation of the NepaliDate object in the specified format.
     */
    formatNepali(formatStr: string): string {
        return formatNepali(this, formatStr)
    }

    /**
     * Returns a string representation of the NepaliDate object.
     *
     * @returns {string} The string representation of the Nepali date.
     */
    toString(): string {
        return nepaliDateToString(this)
    }

    /* Static methods */

    /**
     * Creates a new instance of NepaliDate from an English calendar parameters.
     *
     * @param year - The year in English calendar format.
     * @param month0 - The month (0-11) in English calendar format.
     * @param date - The day of the month in English calendar format.
     * @param hour - The hour (0-23) in English calendar format. Default is 0.
     * @param minute - The minute (0-59) in English calendar format. Default is 0.
     * @param second - The second (0-59) in English calendar format. Default is 0.
     * @param ms - The millisecond (0-999) in English calendar format. Default is 0.
     * @returns A new instance of NepaliDate corresponding to the provided English date.
     */
    static fromEnglishDate(
        year: number,
        month0: number,
        date: number,
        hour: number = 0,
        minute: number = 0,
        second: number = 0,
        ms: number = 0
    ): NepaliDate {
        const englishDate = getDate(year, month0, date, hour, minute, second, ms)
        return new NepaliDate(englishDate)
    }
}

NepaliDate.minimum = () =>
    NepaliDate.fromEnglishDate(dateConverter.enMinYear(), 0, 1).getDateObject()
NepaliDate.maximum = () =>
    NepaliDate.fromEnglishDate(dateConverter.enMaxYear(), 11, 31).getDateObject()

export default NepaliDate
