/**
 * Represents a Nepali calendar date.
 */
declare class NepaliDate {
    timestamp: Date;
    year: number;
    yearEn: number;
    month: number;
    monthEn: number;
    day: number;
    dayEn: number;
    hour: number;
    minute: number;
    weekDay: number;
    static minimum: () => Date;
    static maximum: () => Date;
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
     *   - String and format: Parses the string in a given format.
     *     ```
     *     const date1 = new NepaliDate('Baisakh 1, 2080', 'MMMM D, YYYY');
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
    constructor(...args: any[]);
    /**
     * Sets the English date and optionally computes the corresponding Nepali date.
     * Handles all the operations and variables while setting the English date.
     *
     * @param date The English date to set.
     * @param computeNepaliDate Flag indicating whether to compute the Nepali date. Default is `false`.
     * @returns void
     */
    private _setDateObject;
    /**
     * Retrieves the Date object equivalent to the NepaliDate.
     *
     * @returns {Date} The equivalent JavaScript Date object.
     */
    getDateObject(): Date;
    /**
     * Retrieves the year of the Nepali date in the Nepali calendar.
     *
     * @returns {number} The full numeric value representing the year. Eg. 2080
     */
    getYear(): number;
    /**
     * Retrieves the year of the Nepali date in the English calendar.
     *
     * @returns {number} The full numeric value representing the year. Eg. 2009
     */
    getEnglishYear(): number;
    /**
     * Retrieves the month of the Nepali date in the Nepali calendar.
     *
     * @returns {number} The numeric value representing the month. 0 for Baishakh and 11 for Chaitra.
     */
    getMonth(): number;
    /**
     * Retrieves the month of the Nepali date in the English calendar.
     *
     * @returns {number} The numeric value representing the month. 0 for January and 11 for December.
     */
    getEnglishMonth(): number;
    /**
     * Retrieves the day of the month represented of Nepali date in Nepali calendar.
     *
     * @returns {number} The numeric value representing the day of the month.
     */
    getDate(): number;
    /**
     * Retrieves the day of the month represented of Nepali date in English calendar.
     *
     * @returns {number} The numeric value representing the day of the month.
     */
    getEnglishDate(): number;
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
    getDay(): number;
    /**
     * Retrieves the hour value of the Nepali date.
     *
     * @returns {number} The numeric value representing the hour.
     */
    getHours(): number;
    /**
     * Retrieves the minute value of the Nepali date.
     *
     * @returns {number} The numeric value representing the minute.
     */
    getMinutes(): number;
    /**
     * Retrieves the second value of the Nepali date.
     *
     * @returns {number} The numeric value representing the second.
     */
    getSeconds(): number;
    /**
     * Retrieves the millisecond value of the Nepali date.
     *
     * @returns {number} The numeric value representing the millisecond.
     */
    getMilliseconds(): number;
    /**
     * Retrieves the unix timestamp (in milliseconds) of the Nepali date.
     *
     * @returns {number} The numeric value representing the time in milliseconds.
     */
    getTime(): number;
    /**
     * Sets the day on the current date and time
     *
     * @param {number} year - The numeric value representing the year.
     * @throws {ValidationError} if year is out of range
     */
    setYear(year: number): void;
    /**
     * Sets the day on the current date and time
     *
     * @param {number} month - The numeric value representing the month.
     * @throws {ValidationError} if month is out of range
     */
    setMonth(month: number): void;
    /**
     * Sets the day on the current date and time
     *
     * @param {number} day - The numeric value representing the day.
     * @throws {ValidationError} if day is out of range
     */
    setDate(day: number): void;
    /**
     * Sets hour on the current date and time
     *
     * @param hour Hour to set
     * @throws {ValidationError} if hour is out of range
     */
    setHours(hour: number): void;
    /**
     * Sets minute on the current date and time
     *
     * @param minute Minute to set
     * @throws {ValidationError} if minute is out of range
     */
    setMinutes(minute: number): void;
    /**
     * Sets second on the current date and time
     *
     * @param second Second to set
     * @throws {ValidationError} if second is out of range
     */
    setSeconds(second: number): void;
    /**
     * Sets milliseconds on the current date and time
     *
     * @param ms Milliseconds to set
     * @throws {ValidationError} if milliseconds is out of range
     */
    setMilliseconds(ms: number): void;
    /**
     * Sets time on the object.
     *
     * @param time Time to set (timestamp)
     */
    setTime(time: number): void;
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
    set(year: number, month: number, date: number, hour: number, minute: number, second: number, ms: number): void;
    /**
     * Returns a string representation (in English) of the NepaliDate object in the specified format.
     *
     * @param {string} formatStr - The format string specifying the desired format.
     * @returns {string} The formatted Nepali date string.
     */
    format(formatStr: string): string;
    /**
     * Returns a string representation in the Nepali (Devanagari) of the NepaliDate object in the specified format.
     * @param formatStr The format string for the desired output.
     * @returns {string} A string representation of the NepaliDate object in the specified format.
     */
    formatNepali(formatStr: string): string;
    /**
     * Returns a string representation of the NepaliDate object.
     *
     * @returns {string} The string representation of the Nepali date.
     */
    toString(): string;
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
    static fromEnglishDate(year: number, month0: number, date: number, hour?: number, minute?: number, second?: number, ms?: number): NepaliDate;
}
export default NepaliDate;
