import dateConverter from './dateConverter'
import { NP_MONTHS_DATA } from './dateConverter/constants'
import {
    format,
    formatEnglishDate,
    formatEnglishDateInNepali,
    formatNepali,
    nepaliDateToString,
} from './format'
import NepalTimezoneDate from './NepalTimezoneDate'

import { parse, parseFormat, parseEnglishDateFormat } from './parse'
import { validateTime } from './validators'

/**
 * Represents a Nepali calendar date.
 */
class NepaliDate {
    private timestamp: Date
    private year: number
    private yearEn: number
    private month: number
    private monthEn: number
    private day: number
    private dayEn: number
    private hour: number
    private minute: number
    private weekDay: number

    /**
     * Creates a NepaliDate instance for the current date and time.
     *
     * @example
     * const now = new NepaliDate()
     */
    constructor()

    /**
     * Creates a NepaliDate instance from a provided Javascript Date object.
     *
     * @param {Date} date - The Javascript Date object.
     *
     * @example
     * const jsDate = new Date("2020-01-01")
     * const nepaliDate = new NepaliDate(jsDate)
     */
    constructor(date: Date)

    /**
     * Creates a new NepaliDate instance from another NepaliDate object.
     *
     * @param {NepaliDate} date - The NepaliDate object.
     * @example
     * const nepaliDateOld = new NepaliDate('2080-01-01')
     * const nepaliDate = new NepaliDate(nepaliDateOld)
     */
    constructor(date: NepaliDate)

    /**
     * Creates a NepaliDate instance by parsing a provided date-time string.
     *
     * @param {string} value - The date-time string.
     * @example
     * const nepaliDate = new NepaliDate('2080-01-01')
     */
    constructor(value: string)

    /**
     * Creates a NepaliDate instance from a provided Unix timestamp.
     *
     * @param {number} value - The Unix timestamp.
     * @example
     * const timestamp = 1695569762 // Unix timestamp in milliseconds
     * const nepaliDate = new NepaliDate(timestamp)
     */
    constructor(value: number)

    /**
     * Creates a NepaliDate instance by parsing a provided date-time string
     * with the given format.
     *
     * @param dateString - The date-time string to parse.
     * @param format - The format of the provided date-time string.
     * @example
     * const dateTimeString = '2080/08/12 14-05-23.789'
     * const format = 'YYYY/MM/DD HH-mm-ss.SSS'
     * const nepaliDate = new NepaliDate(dateTimeString, format)
     */
    constructor(dateString: string, format: string)

    /**
     * Creates a NepaliDate instance from a provided Nepali calendar date components.
     *
     * @constructor
     * @param {number} year - The year (e.g., 2080).
     * @param {number} month - The month (0-11, where 0 is Baisakh and 11 is Chaitra).
     * @param {number} [day=1] - The day of the month (1-31).
     * @param {number} [hour=0] - The hour of the day (0-23).
     * @param {number} [minute=0] - The minute (0-59).
     * @param {number} [second=0] - The second (0-59).
     * @param {number} [ms=0] - The milliseconds (0-999).
     *
     * @example
     * const year = 2080
     * const month = 1 // Jestha
     * const day = 12
     * const hour = 12
     * const minute = 30
     * const second = 45
     * const ms = 500
     * const nepaliDate = new NepaliDate(year, month, day, hour, minute, second, ms)
     */
    constructor(
        year: number,
        month: number,
        day?: number,
        hour?: number,
        minute?: number,
        second?: number,
        ms?: number
    )

    /**
     * Creates a NepaliDate instance from a NepalTimezoneDate object.
     *
     * @param {NepalTimezoneDate} date - The NepalTimezoneDate object.
     * @example
     * const npTzDate = new NepalTimezoneDate('2024-12-28T15:00:35Z')
     * const nepaliDate = new NepaliDate(npTzDate)
     */
    constructor(date: NepalTimezoneDate)

    constructor(...args: any[]) {
        if (args.length === 0) {
            this.initFromCurrentDate()
        } else if (args.length === 1 && args[0] instanceof Date) {
            this.initFromEnglishDate(args[0])
        } else if (args.length === 1 && args[0] instanceof NepaliDate) {
            this.initFromNepaliDate(args[0])
        } else if (args.length === 1 && typeof args[0] === 'string') {
            this.parseFromString(args[0])
        } else if (args.length === 1 && typeof args[0] === 'number') {
            this.initFromTimestamp(args[0])
        } else if (args.length === 1 && args[0] instanceof NepalTimezoneDate) {
            this._setDateObject(args[0].toDate())
        } else if (
            args.length === 2 &&
            typeof args[0] === 'string' &&
            typeof args[1] === 'string'
        ) {
            this.parseFromStringWithFormat(args[0], args[1])
        } else if (
            args.length >= 2 &&
            args.length <= 8 &&
            args.every(arg => typeof arg === 'number')
        ) {
            this.initFromComponents(args)
        } else {
            throw new Error('Invalid date argument')
        }
    }

    /* Object initialization */

    private initFromCurrentDate() {
        this._setDateObject(new Date())
    }

    private initFromEnglishDate(date: Date) {
        this._setDateObject(date)
    }

    private initFromNepaliDate(date: NepaliDate) {
        this.set(
            date.year,
            date.month,
            date.day,
            date.hour,
            date.minute,
            date.getSeconds(),
            date.getMilliseconds()
        )
    }

    private parseFromString(value: string) {
        const parsedResult = parse(value)
        this.set(
            parsedResult[0], // Year
            parsedResult[1], // Month
            parsedResult[2], // Date
            parsedResult[3], // Hour
            parsedResult[4], // Minute
            parsedResult[5], // Second
            parsedResult[6] // Millisecond
        )
    }

    private initFromTimestamp(value: number) {
        this._setDateObject(new Date(value))
    }

    private parseFromStringWithFormat(dateString: string, format: string) {
        const parsedResult = parseFormat(dateString, format)
        this.set(
            parsedResult[0], // Year
            parsedResult[1], // Month
            parsedResult[2], // Date
            parsedResult[3], // Hour
            parsedResult[4], // Minute
            parsedResult[5], // Second
            parsedResult[6] // Millisecond
        )
    }

    private initFromComponents(args: number[]) {
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

    /* Object methods */

    /**
     * Sets the English date and optionally computes the corresponding Nepali date.
     * Handles all the operations and variables while setting the English date.
     *
     * @param date The English date to set.
     * @param computeNepaliDate Flag indicating whether to compute the Nepali date. Default is `true`.
     * @returns void
     */
    private _setDateObject(date: Date, computeNepaliDate: boolean = true) {
        const npTzDate = new NepalTimezoneDate(date)
        this.timestamp = date

        // getting Nepal's hour, minute, and weekDay
        this.yearEn = npTzDate.getYear()
        this.monthEn = npTzDate.getMonth()
        this.dayEn = npTzDate.getDate()
        this.hour = npTzDate.getHours()
        this.minute = npTzDate.getMinutes()
        this.weekDay = npTzDate.getDay()

        if (computeNepaliDate) {
            const [yearNp, month0Np, dayNp] = dateConverter.englishToNepali(
                this.yearEn,
                this.monthEn,
                this.dayEn
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
     * @returns {number} The numeric value representing the month. 0 for Baisakh and 11 for Chaitra.
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
            NepalTimezoneDate['getDate'](
                yearEn,
                month0EN,
                dayEn,
                hour,
                minute,
                second,
                ms
            ),
            false
        )
    }

    /**
     * Sets the Date object on the current NepaliDate object.
     *
     * @param date The Date object to set.
     * @returns void
     */
    setDateObject(date: Date) {
        this._setDateObject(date, true) // forcing to compute nepali date
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
     * @returns {string} The formatted Date string in Nepali (Devanagari).
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

    /**
     * Returns a string representation (in English) of the English Date in the specified format.
     *
     * @param {string} formatStr - The format string specifying the desired format.
     * @returns {string} The formatted Date string.
     */
    formatEnglishDate(formatStr: string): string {
        return formatEnglishDate(this, formatStr)
    }

    /**
     * Returns a string representation in the Nepali (Devanagari) of the English Date in the specified format.
     * @param formatStr The format string for the desired output.
     * @returns {string} The formatted Date string in Nepali (Devanagari).
     */
    formatEnglishDateInNepali(formatStr: string): string {
        return formatEnglishDateInNepali(this, formatStr)
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
        const englishDate = NepalTimezoneDate['getDate'](
            year,
            month0,
            date,
            hour,
            minute,
            second,
            ms
        )
        return new NepaliDate(englishDate)
    }

    /**
     * Creates a NepaliDate instance by parsing a provided English Date and Time string
     * with the given format.
     *
     * @param dateString - The English Date and time string.
     * @param format - The format of the provided date-time string.
     * @example
     * const dateTimeString = '2024/11/23 14-05-23.789'
     * const format = 'YYYY/MM/DD HH-mm-ss.SSS'
     * const nepaliDate = NepaliDate.parseEnglishDate(dateTimeString, format)
     */
    static parseEnglishDate(dateString: string, format: string): NepaliDate {
        const [year, month0, day, hour, minute, second, ms] = parseEnglishDateFormat(
            dateString,
            format
        )
        return NepaliDate.fromEnglishDate(year, month0, day, hour, minute, second, ms)
    }

    /**
     * Returns the number of days in a specific month of a given year.
     *
     * @param year - The year to fetch the month from.
     * @param month - The month to get the number of days for.
     * @returns The number of days in the specified month.
     * @throws {Error} If the year or month is out of range.
     */
    static getDaysOfMonth(year: number, month: number): number {
        if (year < dateConverter.npMinYear() || year > dateConverter.npMaxYear()) {
            throw new Error('Year out of range')
        }

        if (month < 0 || month > 11) {
            throw new Error('Month out of range')
        }

        return NP_MONTHS_DATA[year - dateConverter.npMinYear()][0][month]
    }

    /**
     * Returns the minimum supported JS Date object.
     *
     * @returns {Date} The minimum supported JS Date object.
     */
    static minSupportedDate(): Date {
        return NepaliDate.fromEnglishDate(
            dateConverter.enMinYear(),
            0,
            1
        ).getDateObject()
    }

    /**
     * Returns the maximum supported JS Date object.
     *
     * @returns {Date} The maximum supported JS Date object.
     */
    static maxSupportedDate(): Date {
        return NepaliDate.fromEnglishDate(
            dateConverter.enMaxYear(),
            11,
            31
        ).getDateObject()
    }

    /**
     * Returns the minimum supported NepaliDate object.
     *
     * @returns {Date} The minimum supported NepaliDate object.
     */
    static minSupportedNepaliDate(): NepaliDate {
        return new NepaliDate(dateConverter.npMinYear(), 0, 1)
    }

    /**
     * Returns the maximum supported NepaliDate object.
     *
     * @returns {Date} The maximum supported NepaliDate object.
     */
    static maxSupportedNepaliDate(): NepaliDate {
        const npMaxYear = dateConverter.npMaxYear()
        return new NepaliDate(npMaxYear, 11, this.getDaysOfMonth(npMaxYear, 11))
    }

    static minimum(): Date {
        console.warn(
            '`NepaliDate.minimum()` is deprecated and will be removed in a future version. Please use `NepaliDate.minSupportedDate()` instead.'
        )
        return this.minSupportedDate()
    }

    static maximum(): Date {
        console.warn(
            '`NepaliDate.maximum()` is deprecated and will be removed in a future version. Please use `NepaliDate.maxSupportedDate()` instead.'
        )
        return this.maxSupportedDate()
    }
}

export default NepaliDate
