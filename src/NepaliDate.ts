import dateConverter from './dateConverter'
import { format, formatNepali, nepaliDateToString } from './format'
import { parse, parseFormat } from './parse'
import { getDate, getNepalDateAndTime } from './utils'
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
    static minimum: () => Date
    static maximum: () => Date

    /**
     * Creates NepaliDate instance from current date
     * @example new Date()
     */
    constructor()

    /**
     * Create NepaliDate instance from provided english date
     *
     * @param {Date} date
     *
     * @example
     * const nepaliDate = new NepaliDate( new Date('2020-01-01') )
     *
     */
    constructor(date: Date)

    /**
     * Create NepaliDate instance from using a provided english date
     * @param {NepaliDate} date: nepali date value provided as a value.
     * @example
     * const nepaliDateOld = new NepaliDate('2080-01-01')
     * const nepaliDate = new NepaliDate( nepaliDateOld )
     *
     */
    constructor(date: NepaliDate)

    /**
     * Create NepaliDate instance by parsing a provided string value
     * @param {string} value: string date time.
     * @example
     * const nepaliDate = new NepaliDate('2080-01-01')
     *
     */
    constructor(value: string)

    /**
     * Create NepaliDate instance by parsing a provided numeric value
     * @param {number} value: numeric value
     * @example
     * const n = new NepaliDate(new Date(373314600000))
     *
     */
    constructor(value: number)

    /**
     * Create NepaliDate instance by parsing a provided time string with format provided
     * @param dateString: string date time
     * @param format: string format of the date provided
     * @example
     * const n1 = new NepaliDate('2042/08/12 14-05-23.789', 'YYYY/MM/DD HH-mm-ss.SSS')
     *
     */
    constructor(dateString: string, format: string)

    /**
     * Creates a new instance of the Date class.
     *
     * @constructor
     * @param {number} year - The year.
     * @param {number} month - The month (0-11, where 0 is January and 11 is December).
     * @param {number=} day - The day of the month (1-31).
     * @param {number=} hour - The hour of the day (0-23).
     * @param {number=} minute - The minute (0-59).
     * @param {number=} second - The second (0-59).
     * @param {number=} ms - The milliseconds (0-999).
     *
     * @example
     * const [year, month, day] = [2080, 1, 12]
     * const hour = 12
     * const minute = 30
     * const second = 45
     * const ms = 500
     * const nd = new NepaliDate(year, month, day, hour, minute, second, ms)
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
     * @param computeNepaliDate Flag indicating whether to compute the Nepali date. Default is `true`.
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
