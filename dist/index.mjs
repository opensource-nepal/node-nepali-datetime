// Reference date for conversion is 2000/01/01 BS and 1943/4/14 AD
const NP_INITIAL_YEAR = 2000;
const REFERENCE_EN_DATE = [1943, 4, 14];
// English month constant data (will never change)
const EN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const EN_LEAP_YEAR_MONTHS = [
    31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
]; // Leap year months (Just 29 on Feb)
// Nepali months data
const NP_MONTHS_DATA = [
    [[30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], 366],
    [[31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], 366],
    [[31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], 366],
    [[31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], 366],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
    [[31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], 366],
    [[31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], 365],
    [[31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30], 366],
    [[30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], 365],
    [[31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30], 365],
    [[31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30], 365],
    [[31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30], 366],
    [[30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], 365],
    [[31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30], 366],
    [[30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30], 365],
    [[30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], 365],
    [[30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], 365],
    [[31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30], 366],
    [[30, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30], 365],
    [[30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], 365],
    [[31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30], 366],
    [[30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], 364],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], 366],
    [[31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 29, 31], 365],
    [[31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30], 365], // 2099 BS - 2042/2043 AD
];

/**
 * dateConverter.ts
 *
 * This module provides functions for converting dates between the English (Gregorian) and Nepali calendars.
 * It includes functions for converting English to Nepali dates, Nepali to English dates, and validating date ranges.
 * The conversion is based on the official Nepali calendar data and reference date.
 *
 * Functions:
 *
 * - `englishToNepali(year: number, month0: number, day: number): [number, number, number]`
 *   Converts a given English (Gregorian) date to Nepali date.
 *
 * - `nepaliToEnglish(year: number, month0: number, day: number): [number, number, number]`
 *   Converts a given Nepali date to English (Gregorian) date.
 *
 * - `DateOutOfRangeError`
 *   Custom error class thrown when a date is out of the valid range.
 *
 * - Other helper functions and constants for date calculations and validations.
 *
 * Usage Example:
 *
 * ```typescript
 * import dateConverter from './dateConverter';
 *
 * const [npYear, npMonth, npDay] = dateConverter.englishToNepali(2023, 5, 27);
 * console.log(`Nepali Date: ${npYear}-${npMonth}-${npDay}`);
 *
 * const [enYear, enMonth, enDay] = dateConverter.nepaliToEnglish(2080, 2, 15);
 * console.log(`English Date: ${enYear}-${enMonth}-${enDay}`);
 * ```
 *
 * Note: There are two types of month variables used in this file.
 * The first is `month0`, which represents month values starting from 0,
 * for example, 0 for January and 0 for Baishakh.
 * The second is `month`, which represents month values starting from 1.
 */
/**
 * Custom error class for representing date out of range error.
 */
class DateOutOfRangeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DateOutOfRangeError';
    }
}
/*
 * utility methods */
/**
 * Returns the minimum valid year for date conversion.
 * @returns The minimum valid year for date conversion.
 */
const enMinYear = () => {
    return REFERENCE_EN_DATE[0] + 1;
};
/**
 * Returns the maximum valid year for date conversion.
 * @returns The maximum valid year for date conversion.
 */
const enMaxYear = () => {
    return REFERENCE_EN_DATE[0] + NP_MONTHS_DATA.length - 1;
};
/**
 * Returns the minimum valid year for date conversion.
 * @returns The minimum valid year for date conversion.
 */
const npMinYear = () => {
    return NP_INITIAL_YEAR;
};
/**
 * Returns the maximum valid year for date conversion.
 * @returns The maximum valid year for date conversion.
 */
const npMaxYear = () => {
    return NP_INITIAL_YEAR + NP_MONTHS_DATA.length - 1;
};
/**
 * Checks if a given year is a leap year in English calendar.
 * @param year - The year to check.
 * @returns A boolean indicating whether the year is a leap year.
 */
const _isLeapYear = (year) => {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
};
/**
 * Returns the number of days in each month of a given year in English calendar.
 * @param year - The year for which to retrieve the months.
 * @returns An array containing the number of days in each month of the year.
 */
const _getEnMonths = (year) => {
    return _isLeapYear(year) ? EN_LEAP_YEAR_MONTHS : EN_MONTHS;
};
/*
 * ENGLISH TO NEPALI DATE CONVERSION */
/**
 * Checks if the provided English date is valid.
 * @param year - The year in English calendar.
 * @param month - The month in English calendar. Starting from 1, 1 for January.
 * @param day - The day in English calendar.
 * @returns True if the date is valid, false otherwise.
 */
const _checkEnglishDate = (year, month, day) => {
    if (year < enMinYear() || year > enMaxYear())
        return false;
    if (month < 1 || month > 12)
        return false;
    if (day < 1 || day > _getEnMonths(year)[month - 1])
        return false;
    return true;
};
/**
 * Calculates the total number of days from the given English date.
 * @param year - The year in English calendar.
 * @param month - The month in English calendar.  Starting from 1, 1 for January.
 * @param day - The day in English calendar.
 * @returns The total number of days.
 */
const _getTotalDaysFromEnglishDate = (year, month, day) => {
    let total_days = year * 365 + day;
    for (let i = 0; i < month - 1; i++) {
        total_days += EN_MONTHS[i];
    }
    // adding leap days (ie. leap year count)
    if (month <= 2) {
        year -= 1;
    }
    total_days += Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);
    return total_days;
};
/**
 * Converts an English date to Nepali date.
 * @param year - The year in English calendar.
 * @param month0 - The month in English calendar. Starting from 0, 0 for January.
 * @param day - The day in English calendar.
 * @returns The corresponding Nepali date as an array of [year, month, day].
 * @throws {DateOutOfRangeError} If the provided date is out of range.
 */
function englishToNepali(year, month0, day) {
    const month = month0 + 1;
    // VALIDATION
    // checking if date is in range
    if (!_checkEnglishDate(year, month, day)) {
        throw new DateOutOfRangeError('Date out of range');
    }
    // REFERENCE
    let np_year = NP_INITIAL_YEAR;
    let np_month = 1;
    let np_day = 1;
    // DIFFERENCE
    // calculating days count from the reference date
    let difference = Math.abs(_getTotalDaysFromEnglishDate(year, month, day) -
        _getTotalDaysFromEnglishDate(...REFERENCE_EN_DATE));
    // YEAR
    // Incrementing year until the difference remains less than 365
    let year_data_index = 0;
    while (difference >= NP_MONTHS_DATA[year_data_index][1]) {
        difference -= NP_MONTHS_DATA[year_data_index][1];
        np_year += 1;
        year_data_index += 1;
    }
    // MONTH
    // Incrementing month until the difference remains less than next nepali month days (mostly 31)
    let i = 0;
    while (difference >= NP_MONTHS_DATA[year_data_index][0][i]) {
        difference -= NP_MONTHS_DATA[year_data_index][0][i];
        np_month += 1;
        i += 1;
    }
    // DAY
    // Remaining difference is the day
    np_day += difference;
    return [np_year, np_month - 1, np_day];
}
/*
 * NEPALI TO ENGLISH DATE CONVERSION */
/**
 * Checks if the provided Nepali date is valid and within the range.
 * @param year - The year in Nepali calendar.
 * @param month - The month in Nepali calendar. Starting from 1, 1 for Baishakh.
 * @param day - The day in Nepali calendar.
 * @returns True if the date is valid and within the range, false otherwise.
 */
const _checkNepaliDate = (year, month, day) => {
    if (year < npMinYear() || year > npMaxYear())
        return false;
    if (month < 1 || month > 12)
        return false;
    if (day < 1 || day > NP_MONTHS_DATA[year - NP_INITIAL_YEAR][0][month - 1])
        return false;
    return true;
};
/**
 * Calculates the total number of days from the Nepali reference date to the provided Nepali date.
 * @param year - The year in Nepali calendar.
 * @param month - The month in Nepali calendar. Starting from 1, 1 for Baishakh.
 * @param day - The day in Nepali calendar.
 * @returns The total number of days from the reference date to the provided Nepali date.
 */
const _getTotalDaysFromNepaliDate = (year, month, day) => {
    let total_days = day - 1;
    const year_index = year - NP_INITIAL_YEAR;
    for (let i = 0; i < month - 1; i++) {
        total_days += NP_MONTHS_DATA[year_index][0][i];
    }
    for (let i = 0; i < year_index; i++) {
        total_days += NP_MONTHS_DATA[i][1];
    }
    return total_days;
};
/**
 * Converts a Nepali date to the corresponding English date.
 * @param year - The year in Nepali calendar.
 * @param month - The month in Nepali calendar.
 * @param day - The day in Nepali calendar. Starting from 0, 0 for Baishakh.
 * @returns An array containing the corresponding English year, month, and day.
 * @throws {DateOutOfRangeError} If the provided Nepali date is out of range.
 */
const nepaliToEnglish = (year, month0, day) => {
    const month = month0 + 1;
    // VALIDATION
    if (!_checkNepaliDate(year, month, day)) {
        throw new DateOutOfRangeError('Date out of range');
    }
    // REFERENCE
    // For absolute reference, moving date to Jan 1
    // Eg. ref: 1943/4/14 => 1943/01/01
    let [en_year, en_month, en_day] = [REFERENCE_EN_DATE[0], 1, 1];
    // calculating difference from the adjusted reference (eg. 1943/4/14 - 1943/01/01)
    const ref_year_months = _getEnMonths(en_year);
    const reference_diff = ref_year_months
        .slice(0, REFERENCE_EN_DATE[1] - 1)
        .reduce((acc, curr) => acc + curr, 0) +
        REFERENCE_EN_DATE[2] -
        1; // day - 1
    // DIFFERENCE
    // calculating days count from the reference date
    let difference = Math.abs(_getTotalDaysFromNepaliDate(year, month, day) + reference_diff);
    // YEAR
    // Incrementing year until the difference remains less than 365 (or 365)
    while ((difference >= 366 && _isLeapYear(en_year)) ||
        (difference >= 365 && !_isLeapYear(en_year))) {
        difference -= _isLeapYear(en_year) ? 366 : 365;
        en_year += 1;
    }
    // MONTH
    // Incrementing month until the difference remains less than next english month (mostly 31)
    const month_days = _getEnMonths(en_year);
    let i = 0;
    while (difference >= month_days[i]) {
        difference -= month_days[i];
        en_month += 1;
        i += 1;
    }
    // DAY
    // Remaining difference is the day
    en_day += difference;
    return [en_year, en_month - 1, en_day];
};
var dateConverter = {
    enMinYear,
    enMaxYear,
    npMinYear,
    npMaxYear,
    englishToNepali,
    nepaliToEnglish,
};

const UTC_OFFSET_IN_MS = 20700000; // 5 hours 45 minutes in ms
// timezone reference for +5:30
const OLD_UTC_OFFSET_IN_MS = 19800000; // 5 hours 40 minutes in ms
// 504901800000: Wed Jan 01 1986 00:15:00 GMT+0545 (Nepal Time)
// is the timezone transition date on JavaScript
const TIMEZONE_TRANSITION_TIMESTAMP = 504901800000;
const TIMEZONE_TRANSITION_DATE_REFERENCE = new Date(1986, 0, 1, 0, 15);
const MONTHS_EN = [
    'Baisakh',
    'Jestha',
    'Asar',
    'Shrawan',
    'Bhadra',
    'Aswin',
    'Kartik',
    'Mangsir',
    'Poush',
    'Magh',
    'Falgun',
    'Chaitra',
];
const MONTHS_SHORT_EN = [
    'Bai',
    'Jes',
    'Asa',
    'Shr',
    'Bhd',
    'Asw',
    'Kar',
    'Man',
    'Pou',
    'Mag',
    'Fal',
    'Cha',
];
const MONTHS_NP = [
    'बैशाख',
    'जेठ',
    'असार',
    'श्रावण',
    'भाद्र',
    'आश्विन',
    'कार्तिक',
    'मंसिर',
    'पौष',
    'माघ',
    'फाल्गुण',
    'चैत्र',
];
const MONTHS_SHORT_NP = [
    'बै',
    'जे',
    'अ',
    'श्रा',
    'भा',
    'आ',
    'का',
    'मं',
    'पौ',
    'मा',
    'फा',
    'चै',
];
const NUM_NP = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
const WEEKDAYS_SHORT_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAYS_LONG_EN = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
const WEEKDAYS_SHORT_NP = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'];
const WEEKDAYS_LONG_NP = [
    'आइतबार',
    'सोमबार',
    'मंगलबार',
    'बुधबार',
    'बिहिबार',
    'शुक्रबार',
    'शनिबार',
];

/* Helper functions */
/**
 * Pads a number with a leading zero if it is less than 10.
 *
 * Output: 1 => 01, 11 => 11
 *
 * @param n - The number to be padded.
 * @returns The padded number as a string.
 */
function zeroPadding(n) {
    if (n < 10) {
        return `0${n}`;
    }
    return `${n}`;
}
/**
 * Pads a number with a leading zero if it is less than 100.
 *
 * Output: 1 => 001, 11 => 011, 111 => 111
 *
 * @param n - The number to be padded.
 * @returns The padded number as a string.
 */
function millisecondZeroPadding(n) {
    if (n < 10) {
        return `00${n}`;
    }
    else if (n < 100) {
        return `0${n}`;
    }
    return `${n}`;
}
function npDigit(str) {
    let res = '';
    for (let i = 0; i < str.length; i += 1) {
        res += NUM_NP[str.charCodeAt(i) - 48];
    }
    return res;
}
/* Formatters */
function yearEn(format, size) {
    return date => {
        if (size === 1 || size === 4)
            return String(date.year);
        if (size === 2) {
            return String(date.year).substring(2);
        }
        return format.repeat(size);
    };
}
function yearNp(format, size) {
    return date => {
        if (size === 1 || size === 4)
            return npDigit(String(date.year));
        if (size === 2) {
            return npDigit(String(date.year).substring(2));
        }
        return format.repeat(size);
    };
}
function monthEn(format, size) {
    return date => {
        if (size === 1) {
            return String(date.month + 1);
        }
        if (size === 2) {
            return zeroPadding(date.month + 1);
        }
        if (size === 3) {
            return MONTHS_SHORT_EN[date.month];
        }
        if (size === 4) {
            return MONTHS_EN[date.month];
        }
        return format.repeat(size);
    };
}
function monthNp(format, size) {
    return date => {
        if (size === 1) {
            return npDigit(String(date.month + 1));
        }
        if (size === 2) {
            return npDigit(zeroPadding(date.month + 1));
        }
        if (size === 3) {
            return MONTHS_SHORT_NP[date.month];
        }
        if (size === 4) {
            return MONTHS_NP[date.month];
        }
        return format.repeat(size);
    };
}
function dateEn(format, size) {
    return date => {
        if (size === 1) {
            return String(date.day);
        }
        if (size === 2) {
            return zeroPadding(date.day);
        }
        return format.repeat(size);
    };
}
function dateNp(format, size) {
    return date => {
        if (size === 1) {
            return npDigit(String(date.day));
        }
        if (size === 2) {
            return npDigit(zeroPadding(date.day));
        }
        return format.repeat(size);
    };
}
function weekDayEn(format, size) {
    return date => {
        if (size === 1) {
            return String(date.weekDay);
        }
        if (size > 1 && size < 4) {
            // "dd" and "ddd" => "Fri"
            return WEEKDAYS_SHORT_EN[date.weekDay];
        }
        if (size === 4) {
            return WEEKDAYS_LONG_EN[date.weekDay];
        }
        return format.repeat(size);
    };
}
function weekDayNp(format, size) {
    return date => {
        if (size === 1) {
            return npDigit(String(date.weekDay));
        }
        if (size > 1 && size < 4) {
            return WEEKDAYS_SHORT_NP[date.weekDay];
        }
        if (size === 4) {
            return WEEKDAYS_LONG_NP[date.weekDay];
        }
        return format.repeat(size);
    };
}
function hour24En(format, size) {
    return date => {
        if (size === 1) {
            return String(date.hour);
        }
        if (size === 2) {
            return zeroPadding(date.hour);
        }
        return format.repeat(size);
    };
}
function hour24Np(format, size) {
    return date => {
        if (size === 1) {
            return npDigit(String(date.hour));
        }
        if (size === 2) {
            return npDigit(zeroPadding(date.hour));
        }
        return format.repeat(size);
    };
}
function hour12En(format, size) {
    return date => {
        const hour = date.hour > 12 ? date.hour - 12 : date.hour;
        if (size === 1) {
            return String(hour);
        }
        if (size === 2) {
            return zeroPadding(hour);
        }
        return format.repeat(size);
    };
}
function hour12Np(format, size) {
    return date => {
        const hour = date.hour > 12 ? date.hour - 12 : date.hour;
        if (size === 1) {
            return npDigit(String(hour));
        }
        if (size === 2) {
            return npDigit(zeroPadding(hour));
        }
        return format.repeat(size);
    };
}
function minuteEn(format, size) {
    return date => {
        if (size === 1) {
            return String(date.minute);
        }
        if (size === 2) {
            return zeroPadding(date.minute);
        }
        return format.repeat(size);
    };
}
function minuteNp(format, size) {
    return date => {
        if (size === 1) {
            return npDigit(String(date.minute));
        }
        if (size === 2) {
            return npDigit(zeroPadding(date.minute));
        }
        return format.repeat(size);
    };
}
function secondEn(format, size) {
    return date => {
        const seconds = date.getSeconds();
        if (size === 1) {
            return String(seconds);
        }
        if (size === 2) {
            return zeroPadding(seconds);
        }
        return format.repeat(size);
    };
}
function secondNp(format, size) {
    return date => {
        const seconds = date.getSeconds();
        if (size === 1) {
            return npDigit(String(seconds));
        }
        if (size === 2) {
            return npDigit(zeroPadding(seconds));
        }
        return format.repeat(size);
    };
}
function millisecondEn(format, size) {
    return date => {
        const ms = date.getMilliseconds();
        if (size < 4) {
            return millisecondZeroPadding(ms).substring(0, size);
        }
        if (size < 10) {
            return `${millisecondZeroPadding(ms)}${'0'.repeat(size - 3)}`;
        }
        return format.repeat(size);
    };
}
function millisecondNp(format, size) {
    return date => {
        const ms = date.getMilliseconds();
        if (size < 4) {
            return npDigit(millisecondZeroPadding(ms).substring(0, size));
        }
        if (size < 10) {
            return npDigit(`${millisecondZeroPadding(ms)}${'0'.repeat(size - 3)}`);
        }
        return format.repeat(size);
    };
}
function amPmUpperCaseEn(format, size) {
    return date => {
        if (size === 1) {
            return date.hour > 12 ? 'PM' : 'AM';
        }
        return format.repeat(size);
    };
}
function amPmNp(format, size) {
    return date => {
        /**
         * The output of this method is yet to be decided.
         * Further discussion are needed for this method.
         *
         * The most common words used in Nepal are below:
         * - बिहान
         * - मध्यान्ह
         * - दिउसो
         * - बेलुका
         * - रात
         */
        return format.repeat(size);
    };
}
function amPmLowerCaseEn(format, size) {
    return date => {
        if (size === 1) {
            return date.hour > 12 ? 'pm' : 'am';
        }
        return format.repeat(size);
    };
}
function pass(seq) {
    return () => seq;
}
/* formatting functions */
/**
 * Map of formatter factory functions for English format.
 */
const formattersFactoryMapEn = {
    Y: yearEn,
    M: monthEn,
    D: dateEn,
    d: weekDayEn,
    H: hour24En,
    h: hour12En,
    m: minuteEn,
    s: secondEn,
    S: millisecondEn,
    A: amPmUpperCaseEn,
    a: amPmLowerCaseEn,
};
/**
 * Map of formatter factory functions for Nepali format.
 */
const formattersFactoryMapNp = {
    Y: yearNp,
    M: monthNp,
    D: dateNp,
    d: weekDayNp,
    H: hour24Np,
    h: hour12Np,
    m: minuteNp,
    s: secondNp,
    S: millisecondNp,
    A: amPmNp,
    a: amPmNp,
};
/**
 * Get the formatter map based on the locale.
 * @param locale - The locale identifier. Valid values are 'en' for English and 'ne' for Nepali.
 * @returns The formatter map for the specified locale.
 */
function getFormattersFactoryMap(locale) {
    if (locale === 'ne') {
        return formattersFactoryMapNp;
    }
    return formattersFactoryMapEn;
}
function isSpecial(ch, locale) {
    return ch in getFormattersFactoryMap(locale);
}
function getFormatters(formatStr, locale) {
    let inQuote = false;
    let seq = '';
    let special = '';
    let specialSize = 0;
    const formattersFactoryMap = getFormattersFactoryMap(locale);
    const formatters = [];
    for (const ch of formatStr) {
        if (ch === special) {
            specialSize += 1;
            // eslint-disable-next-line no-continue
            continue;
        }
        // Time to process special
        if (special !== '') {
            const formatterFactory = formattersFactoryMap[special];
            const formatter = formatterFactory(special, specialSize);
            formatters.push(formatter);
            special = '';
            specialSize = 0;
        }
        if (ch === '"') {
            inQuote = !inQuote;
            // eslint-disable-next-line no-continue
            continue;
        }
        if (!isSpecial(ch, locale) || inQuote) {
            seq += ch;
        }
        else {
            // got a special character
            if (seq) {
                formatters.push(pass(seq));
                seq = '';
            }
            special = ch;
            specialSize = 1;
        }
    }
    if (seq) {
        formatters.push(pass(seq));
    }
    else if (special) {
        const formatterFactory = formattersFactoryMap[special];
        const formatter = formatterFactory(special, specialSize);
        formatters.push(formatter);
    }
    return formatters;
}
function format(nepaliDate, formatStr) {
    return getFormatters(formatStr, 'en')
        .map(f => f(nepaliDate))
        .join('');
}
function formatNepali(nepaliDate, formatStr) {
    return getFormatters(formatStr, 'ne')
        .map(f => f(nepaliDate))
        .join('');
}
/**
 * Converts a NepaliDate object to a toString() representation.
 * Returns in format YYYY-MM-DD HH:mm:ss[.SSS].
 * This method is light-weight than format/formatNepali method.
 *
 * @param nepaliDate - The NepaliDate object to be converted.
 * @returns The formatted string representation of the NepaliDate.
 */
function nepaliDateToString(nepaliDate) {
    const dateString = `${zeroPadding(nepaliDate.getYear())}-${zeroPadding(nepaliDate.getMonth() + 1)}-${zeroPadding(nepaliDate.getDate())}`;
    const timeString = `${zeroPadding(nepaliDate.getHours())}:${zeroPadding(nepaliDate.getMinutes())}:${zeroPadding(nepaliDate.getSeconds())}`;
    // millisecond
    const ms = nepaliDate.getMilliseconds();
    let millisecondString;
    if (ms === 0) {
        millisecondString = '';
    }
    else {
        millisecondString = `.${millisecondZeroPadding(ms)}`;
    }
    return `${dateString} ${timeString}${millisecondString}`;
}

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
function parseDate(dateString) {
    // Expected date formats are yyyy-mm-dd, yyyy.mm.dd yyyy/mm/dd
    const parts = dateString.split(/[-./]/, 3);
    const [year, month = 1, day = 1] = parts.map(d => {
        const n = parseInt(d, 10);
        if (Number.isNaN(n)) {
            throw new Error('Invalid date');
        }
        return n;
    });
    return [year, month - 1, day];
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
function parseTime(timeString) {
    if (!timeString)
        return [0, 0, 0, 0];
    // fetching milliseconds first
    const [hmsString, msString = '0'] = timeString.split('.', 2);
    const parts = hmsString.split(':', 3);
    const [hour, minute = 0, second = 0] = parts.map(d => {
        const n = parseInt(d, 10);
        if (Number.isNaN(n)) {
            throw new Error('Invalid time');
        }
        return n;
    });
    // converting milliseconds into numbers
    let ms = parseInt(msString, 10);
    if (Number.isNaN(ms))
        ms = 0;
    return [hour, minute, second, ms];
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
function parse(dateTimeString) {
    const [dateString, timeString] = dateTimeString.split(' ', 2);
    const [year, month0, day] = parseDate(dateString);
    const [hour, minute, second, ms] = parseTime(timeString);
    return [year, month0, day, hour, minute, second, ms];
}

/**
 * Get the Nepali date and time components (Gregorian calendar) from a given date.
 * The input can be any date from any timezone, it is converted into the Nepal's timezone (Asia/Kathmandu).
 *
 * @param date - The input date for which to retrieve the Nepali date and time.
 * @returns An object containing the Nepali date and time components.
 */
const getNepalDateAndTime = (date) => {
    const time = date.getTime();
    // Handling the timezone switch from GMT+5:30 to GMT+5:45
    // In javascript the switched time is
    // 504901800000: Wed Jan 01 1986 00:15:00 GMT+0545 (Nepal Time) : Adjusted time
    const utcOffsetInMs = time < TIMEZONE_TRANSITION_TIMESTAMP ? OLD_UTC_OFFSET_IN_MS : UTC_OFFSET_IN_MS;
    // Calculate the Nepali reference date by adding the offset to the input date's unix timestamp
    const nepaliRefDate = new Date(time + utcOffsetInMs);
    // Extract the Nepali date and time components
    const npYear = nepaliRefDate.getUTCFullYear();
    const npMonth0 = nepaliRefDate.getUTCMonth();
    const npDay = nepaliRefDate.getUTCDate();
    const npHour = nepaliRefDate.getUTCHours();
    const npMinutes = nepaliRefDate.getUTCMinutes();
    const npSeconds = nepaliRefDate.getUTCSeconds();
    const npMs = nepaliRefDate.getUTCMilliseconds();
    const npWeekDay = nepaliRefDate.getUTCDay();
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
    };
};
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
const getDate = (year, month, day, hour, minute, second, ms) => {
    // Create a new Date object using the given Nepali date and time parameters
    const nepaliRefDate = new Date(year, month, day, hour, minute, second, ms);
    let utcOffsetInMs = nepaliRefDate < TIMEZONE_TRANSITION_DATE_REFERENCE
        ? OLD_UTC_OFFSET_IN_MS
        : UTC_OFFSET_IN_MS;
    // Getting current timezone offset (in milliseconds)
    const currentOffsetInMS = -1 * nepaliRefDate.getTimezoneOffset() * 60 * 1000;
    // Subtracting Nepali ref date by Nepali timezone offset and current timezone Offset
    const date = new Date(nepaliRefDate.getTime() - utcOffsetInMs + currentOffsetInMS);
    // Return the date object
    return date;
};

/**
 * validators.ts
 *
 * This file contains utility functions for validating data.
 */
/**
 * Custom validation error.
 */
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}
/**
 * Validates the given hour value.
 *
 * @param hour - The hour value to validate.
 * @throws {ValidationError} - If the hour is not within the range of 0-23.
 */
const validateHour = (hour) => {
    if (hour < 0 || hour > 23)
        throw new ValidationError('Hour should be in the range 0-23');
};
/**
 * Validates the given minute value.
 *
 * @param minute - The minute value to validate.
 * @throws {ValidationError} - If the minute is not within the range of 0-59.
 */
const validateMinute = (minute) => {
    if (minute < 0 || minute > 59)
        throw new ValidationError('Minute should be in the range 0-59');
};
/**
 * Validates the given second value.
 *
 * @param second - The second value to validate.
 * @throws {ValidationError} - If the second is not within the range of 0-59.
 */
const validateSecond = (second) => {
    if (second < 0 || second > 59)
        throw new ValidationError('Second should be in the range 0-59');
};
/**
 * Validates the given millisecond value.
 *
 * @param millisecond - The millisecond value to validate.
 * @throws {ValidationError} - If the millisecond is not within the range of 0-999.
 */
const validateMillisecond = (millisecond) => {
    if (millisecond < 0 || millisecond > 999)
        throw new ValidationError('Millisecond should be in the range 0-999');
};
/**
 * Validates the time components.
 * @param hour - The hour component of the time.
 * @param minute - The minute component of the time.
 * @param second - The second component of the time.
 * @param ms - The millisecond component of the time.
 * @throws {ValidationError} if any of the time components are out of range.
 */
const validateTime = (hour, minute, second, ms) => {
    validateHour(hour);
    validateMinute(minute);
    validateSecond(second);
    validateMillisecond(ms);
};

/**
 * Represents a Nepali calendar date.
 */
class NepaliDate {
    timestamp;
    year;
    yearEn;
    month;
    monthEn;
    day;
    dayEn;
    hour;
    minute;
    weekDay;
    static minimum;
    static maximum;
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
    constructor(...args) {
        if (args.length === 0) {
            this._setDateObject(new Date());
        }
        else if (args.length === 1) {
            const e = args[0];
            if (typeof e === 'object') {
                if (e instanceof Date) {
                    this._setDateObject(e);
                }
                else if (e instanceof NepaliDate) {
                    this.timestamp = e.timestamp;
                    this.year = e.year;
                    this.yearEn = e.yearEn;
                    this.month = e.month;
                    this.monthEn = e.monthEn;
                    this.day = e.day;
                    this.dayEn = e.dayEn;
                    this.hour = e.hour;
                    this.minute = e.minute;
                    this.weekDay = e.weekDay;
                }
                else {
                    throw new Error('Invalid date argument');
                }
            }
            else if (typeof e === 'number') {
                this._setDateObject(new Date(e));
            }
            else if (typeof e === 'string') {
                // Try to parse the date
                this.set.apply(this, parse(e));
            }
            else {
                throw new Error('Invalid date argument');
            }
        }
        else {
            this.set(args[0], // year
            args[1], // month
            args[2] ?? 1, // day
            args[3] ?? 0, // hour
            args[4] ?? 0, // minute
            args[5] ?? 0, // second
            args[6] ?? 0 // ms
            );
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
    _setDateObject(date, computeNepaliDate = true) {
        this.timestamp = date;
        // getting Nepal's hour, minute, and weekDay
        const { year, month0, day, hour, minute, weekDay } = getNepalDateAndTime(date);
        this.yearEn = year;
        this.monthEn = month0;
        this.dayEn = day;
        this.hour = hour;
        this.minute = minute;
        this.weekDay = weekDay;
        if (computeNepaliDate) {
            const [yearNp, month0Np, dayNp] = dateConverter.englishToNepali(year, month0, day);
            this.year = yearNp;
            this.month = month0Np;
            this.day = dayNp;
        }
    }
    /**
     * Retrieves the Date object equivalent to the NepaliDate.
     *
     * @returns {Date} The equivalent JavaScript Date object.
     */
    getDateObject() {
        return this.timestamp;
    }
    /**
     * Retrieves the year of the Nepali date in the Nepali calendar.
     *
     * @returns {number} The full numeric value representing the year. Eg. 2080
     */
    getYear() {
        return this.year;
    }
    /**
     * Retrieves the year of the Nepali date in the English calendar.
     *
     * @returns {number} The full numeric value representing the year. Eg. 2009
     */
    getEnglishYear() {
        return this.yearEn;
    }
    /**
     * Retrieves the month of the Nepali date in the Nepali calendar.
     *
     * @returns {number} The numeric value representing the month. 0 for Baishakh and 11 for Chaitra.
     */
    getMonth() {
        return this.month;
    }
    /**
     * Retrieves the month of the Nepali date in the English calendar.
     *
     * @returns {number} The numeric value representing the month. 0 for January and 11 for December.
     */
    getEnglishMonth() {
        return this.monthEn;
    }
    /**
     * Retrieves the day of the month represented of Nepali date in Nepali calendar.
     *
     * @returns {number} The numeric value representing the day of the month.
     */
    getDate() {
        return this.day;
    }
    /**
     * Retrieves the day of the month represented of Nepali date in English calendar.
     *
     * @returns {number} The numeric value representing the day of the month.
     */
    getEnglishDate() {
        return this.dayEn;
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
    getDay() {
        return this.weekDay;
    }
    /**
     * Retrieves the hour value of the Nepali date.
     *
     * @returns {number} The numeric value representing the hour.
     */
    getHours() {
        return this.hour;
    }
    /**
     * Retrieves the minute value of the Nepali date.
     *
     * @returns {number} The numeric value representing the minute.
     */
    getMinutes() {
        return this.minute;
    }
    /**
     * Retrieves the second value of the Nepali date.
     *
     * @returns {number} The numeric value representing the second.
     */
    getSeconds() {
        return this.timestamp.getSeconds();
    }
    /**
     * Retrieves the millisecond value of the Nepali date.
     *
     * @returns {number} The numeric value representing the millisecond.
     */
    getMilliseconds() {
        return this.timestamp.getMilliseconds();
    }
    /**
     * Retrieves the unix timestamp (in milliseconds) of the Nepali date.
     *
     * @returns {number} The numeric value representing the time in milliseconds.
     */
    getTime() {
        return this.timestamp.getTime();
    }
    /**
     * Sets the day on the current date and time
     *
     * @param {number} year - The numeric value representing the year.
     * @throws {ValidationError} if year is out of range
     */
    setYear(year) {
        this.set(year, this.month, this.day, this.hour, this.minute, this.timestamp.getSeconds(), this.timestamp.getMilliseconds());
    }
    /**
     * Sets the day on the current date and time
     *
     * @param {number} month - The numeric value representing the month.
     * @throws {ValidationError} if month is out of range
     */
    setMonth(month) {
        this.set(this.year, month, this.day, this.hour, this.minute, this.timestamp.getSeconds(), this.timestamp.getMilliseconds());
    }
    /**
     * Sets the day on the current date and time
     *
     * @param {number} day - The numeric value representing the day.
     * @throws {ValidationError} if day is out of range
     */
    setDate(day) {
        this.set(this.year, this.month, day, this.hour, this.minute, this.timestamp.getSeconds(), this.timestamp.getMilliseconds());
    }
    /**
     * Sets hour on the current date and time
     *
     * @param hour Hour to set
     * @throws {ValidationError} if hour is out of range
     */
    setHours(hour) {
        this.set(this.year, this.month, this.day, hour, this.minute, this.timestamp.getSeconds(), this.timestamp.getMilliseconds());
    }
    /**
     * Sets minute on the current date and time
     *
     * @param minute Minute to set
     * @throws {ValidationError} if minute is out of range
     */
    setMinutes(minute) {
        this.set(this.year, this.month, this.day, this.hour, minute, this.timestamp.getSeconds(), this.timestamp.getMilliseconds());
    }
    /**
     * Sets second on the current date and time
     *
     * @param second Second to set
     * @throws {ValidationError} if second is out of range
     */
    setSeconds(second) {
        this.set(this.year, this.month, this.day, this.hour, this.minute, second, this.timestamp.getMilliseconds());
    }
    /**
     * Sets milliseconds on the current date and time
     *
     * @param ms Milliseconds to set
     * @throws {ValidationError} if milliseconds is out of range
     */
    setMilliseconds(ms) {
        this.set(this.year, this.month, this.day, this.hour, this.minute, this.timestamp.getSeconds(), ms);
    }
    /**
     * Sets time on the object.
     *
     * @param time Time to set (timestamp)
     */
    setTime(time) {
        this._setDateObject(new Date(time));
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
    set(year, month, date, hour, minute, second, ms) {
        validateTime(hour, minute, second, ms);
        const [yearEn, month0EN, dayEn] = dateConverter.nepaliToEnglish(year, month, date);
        this.year = year;
        this.month = month;
        this.day = date;
        this._setDateObject(getDate(yearEn, month0EN, dayEn, hour, minute, second, ms), false);
    }
    /**
     * Returns a string representation (in English) of the NepaliDate object in the specified format.
     *
     * @param {string} formatStr - The format string specifying the desired format.
     * @returns {string} The formatted Nepali date string.
     */
    format(formatStr) {
        return format(this, formatStr);
    }
    /**
     * Returns a string representation in the Nepali (Devanagari) of the NepaliDate object in the specified format.
     * @param formatStr The format string for the desired output.
     * @returns {string} A string representation of the NepaliDate object in the specified format.
     */
    formatNepali(formatStr) {
        return formatNepali(this, formatStr);
    }
    /**
     * Returns a string representation of the NepaliDate object.
     *
     * @returns {string} The string representation of the Nepali date.
     */
    toString() {
        return nepaliDateToString(this);
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
    static fromEnglishDate(year, month0, date, hour = 0, minute = 0, second = 0, ms = 0) {
        const englishDate = getDate(year, month0, date, hour, minute, second, ms);
        return new NepaliDate(englishDate);
    }
}
NepaliDate.minimum = () => NepaliDate.fromEnglishDate(dateConverter.enMinYear(), 0, 1).getDateObject();
NepaliDate.maximum = () => NepaliDate.fromEnglishDate(dateConverter.enMaxYear(), 11, 31).getDateObject();

export { NepaliDate as default };
//# sourceMappingURL=index.mjs.map
