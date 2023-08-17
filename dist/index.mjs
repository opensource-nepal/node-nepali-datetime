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

const LOCALE_EN = 'en';
const LOCALE_NE = 'ne';
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
// Formatting
const FORMAT_TOKEN_REGEX = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DD?|ddd?d?|do?|YYYY|YY|y{2,4}|yo?|a|A|hh?|HH?|mm?|ss?|SSS|x|X|.)/g;

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
const parseFormatTokens = (format) => {
    const tokens = format.match(FORMAT_TOKEN_REGEX);
    if (!tokens)
        return [];
    return tokens.map(token => {
        return token.startsWith('[') && token.endsWith(']') ? token.slice(1, -1) : token;
    });
};
/**
 * Converts a list of strings to a regex string.
 * It takes possible matching values to be from longest to shortest.  This
 * prevents the possibility of a match occurring for a value that also
 * a substring of a larger value that should have matched (e.g., 'abc'
 * matching when 'abcdef' should have been the match).
 *
 * @param toConvert - An array of string containing all the required regex values
 */
const seqToRE = (toConvert) => {
    // returns /(?:)/ regex for empty array
    if (toConvert.length === 0) {
        return new RegExp('');
    }
    // deepcopy the passed array so as not to change it
    let toConvertCopy = [...toConvert];
    toConvertCopy = toConvertCopy.sort((a, b) => b.length - a.length);
    // means that the list only contains empty string(s)
    if (toConvertCopy[0] === '') {
        return new RegExp(''); // returns /(?:)/
    }
    const regexString = `(${toConvertCopy.join('|')})`;
    return new RegExp(regexString);
};

/* Helper functions */
/**
 * Pads a number with a leading zero if it is less than 10.
 *
 * Output: 1 => 01, 11 => 11
 *
 * @param value - The number to be padded.
 * @returns The padded number as a string.
 */
const zeroPad = (value) => value.toString().padStart(2, '0');
/**
 * Pads a number with a leading zero if it is less than 100.
 *
 * Output: 1 => 001, 11 => 011, 111 => 111
 *
 * @param value - The number to be padded.
 * @returns The padded number as a string.
 */
const millisecondZeroPad = (value) => value.toString().padStart(3, '0');
/**
 * Converts English digits to Nepali digits (Devanagari script).
 *
 * @param {string} str - English digits in string format.
 * @returns {string} Nepali digits in string format.
 */
const npDigit = (str) => {
    return str
        .split('')
        .map(chr => NUM_NP[chr.charCodeAt(0) - 48])
        .join('');
};
/**
 * Returns a localized number (digit) in string format.
 * Converts to Nepali digits for Nepali localization.
 *
 * @param {string | number} obj - The string or number to be localized.
 * @param {Locale} locale - The locale specifying the localization (e.g., 'en' or 'ne').
 * @returns {string} The localized number in string format.
 */
const localizedNumberString = (obj, locale) => {
    const objInString = typeof obj === 'string' ? obj : String(obj);
    if (locale !== LOCALE_NE) {
        return objInString;
    }
    return npDigit(objInString);
};
/* FORMATTERS */
const halfYear = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getYear(), locale).substring(2);
};
const fullYear = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getYear(), locale);
};
const monthNumber = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getMonth() + 1, locale);
};
const monthTwoDigit = (nepaliDate, locale) => {
    return localizedNumberString(zeroPad(nepaliDate.getMonth() + 1), locale);
};
const monthAbbrName = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return MONTHS_SHORT_NP[nepaliDate.getMonth()];
    }
    return MONTHS_SHORT_EN[nepaliDate.getMonth()];
};
const monthFullName = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return MONTHS_NP[nepaliDate.getMonth()];
    }
    return MONTHS_EN[nepaliDate.getMonth()];
};
const dayNumber = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getDate(), locale);
};
const dayTwoDigit = (nepaliDate, locale) => {
    return localizedNumberString(zeroPad(nepaliDate.getDate()), locale);
};
const weekDayNumber = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getDay(), locale);
};
const weekDayShortName = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return WEEKDAYS_SHORT_NP[nepaliDate.getDay()];
    }
    return WEEKDAYS_SHORT_EN[nepaliDate.getDay()];
};
const weekDayFullName = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return WEEKDAYS_LONG_NP[nepaliDate.getDay()];
    }
    return WEEKDAYS_LONG_EN[nepaliDate.getDay()];
};
const hour24Number = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getHours(), locale);
};
const hour24TwoDigit = (nepaliDate, locale) => {
    return localizedNumberString(zeroPad(nepaliDate.getHours()), locale);
};
const hour12Number = (nepaliDate, locale) => {
    const hour24 = nepaliDate.getHours();
    const hour = hour24 > 12 ? hour24 - 12 : hour24;
    return localizedNumberString(hour, locale);
};
const hour12TwoDigit = (nepaliDate, locale) => {
    const hour24 = nepaliDate.getHours();
    const hour = hour24 > 12 ? hour24 - 12 : hour24;
    return localizedNumberString(zeroPad(hour), locale);
};
const minuteNumber = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getMinutes(), locale);
};
const minuteTwoDigit = (nepaliDate, locale) => {
    return localizedNumberString(zeroPad(nepaliDate.getMinutes()), locale);
};
const secondNumber = (nepaliDate, locale) => {
    return localizedNumberString(nepaliDate.getSeconds(), locale);
};
const secondTwoDigit = (nepaliDate, locale) => {
    return localizedNumberString(zeroPad(nepaliDate.getSeconds()), locale);
};
const millisecondThreeDigit = (nepaliDate, locale) => {
    return localizedNumberString(millisecondZeroPad(nepaliDate.getMilliseconds()), locale);
};
const amPmUpperCase = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
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
        return 'A';
    }
    return nepaliDate.getHours() > 12 ? 'PM' : 'AM';
};
const amPmLowerCase = (nepaliDate, locale) => {
    if (locale === LOCALE_NE) {
        return 'a';
    }
    return nepaliDate.getHours() > 12 ? 'pm' : 'am';
};
/* Formatters mapping and implementations */
const TOKENS_TO_FORMATTER = {
    YY: halfYear,
    YYYY: fullYear,
    M: monthNumber,
    MM: monthTwoDigit,
    MMM: monthAbbrName,
    MMMM: monthFullName,
    D: dayNumber,
    DD: dayTwoDigit,
    d: weekDayNumber,
    dd: weekDayShortName,
    ddd: weekDayShortName,
    dddd: weekDayFullName,
    H: hour24Number,
    HH: hour24TwoDigit,
    h: hour12Number,
    hh: hour12TwoDigit,
    m: minuteNumber,
    mm: minuteTwoDigit,
    s: secondNumber,
    ss: secondTwoDigit,
    SSS: millisecondThreeDigit,
    A: amPmUpperCase,
    a: amPmLowerCase,
};
/**
 * Converts a Nepali date object to a formatted string.
 *
 * @param {NepaliDate} nepaliDate - The Nepali date object to be formatted.
 * @param {string} format - The format string to specify the desired output format.
 * @param {Locale} locale - The locale specifying the localization (e.g., 'en' or 'ne').
 * @returns {string} The formatted date in string format.
 */
const formatDate = (nepaliDate, format, locale) => {
    const tokens = parseFormatTokens(format);
    const formatToken = (token) => {
        if (!(token in TOKENS_TO_FORMATTER)) {
            return token;
        }
        return TOKENS_TO_FORMATTER[token](nepaliDate, locale);
    };
    return tokens.map(formatToken).join('');
};
/**
 * Returns a string representation (in English) of the NepaliDate object in the specified format.
 *
 * @param {NepaliDate} nepaliDate - The Nepali date object to be formatted.
 * @param {string} format - The format string for the desired output.
 * @returns {string} - The formatted Nepali date string.
 */
const format = (nepaliDate, format) => {
    return formatDate(nepaliDate, format, LOCALE_EN);
};
/**
 * Returns a string representation in the Nepali (Devanagari) of the NepaliDate object in the specified format.
 *
 * @param {NepaliDate} nepaliDate - The Nepali date object to be formatted.
 * @param {string} format - The format string for the desired output.
 * @returns {string} - A string representation of the NepaliDate object in the specified format.
 */
const formatNepali = (nepaliDate, format) => {
    return formatDate(nepaliDate, format, LOCALE_NE);
};
/**
 * Converts a NepaliDate object to a toString() representation.
 * Returns in format "YYYY-MM-DD HH:mm:ss[.SSS]".
 * This method is lightweight compared to the format/formatNepali method.
 *
 * @param {NepaliDate} nepaliDate - The NepaliDate object to be converted.
 * @returns {string} The formatted string representation of the NepaliDate.
 */
const nepaliDateToString = (nepaliDate) => {
    const year = zeroPad(nepaliDate.getYear());
    const month = zeroPad(nepaliDate.getMonth() + 1);
    const date = zeroPad(nepaliDate.getDate());
    const hours = zeroPad(nepaliDate.getHours());
    const minutes = zeroPad(nepaliDate.getMinutes());
    const seconds = zeroPad(nepaliDate.getSeconds());
    const milliseconds = nepaliDate.getMilliseconds();
    const millisecondString = milliseconds === 0 ? '' : `.${millisecondZeroPad(milliseconds)}`;
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}${millisecondString}`;
};

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
function parseDateString(dateString) {
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
function parseTimeString(timeString) {
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
    const [year, month0, day] = parseDateString(dateString);
    const [hour, minute, second, ms] = parseTimeString(timeString);
    return [year, month0, day, hour, minute, second, ms];
}
/* parse v2 */
const TOKEN_TO_REGEX = {
    YY: /(\d\d)/,
    YYYY: /(\d\d\d\d)/,
    M: /(1[0-2]|0[1-9]|[1-9])/,
    MM: /(1[0-2]|0[1-9]|[1-9])/,
    D: /(3[0-2]|[1-2]\d|0[1-9]|[1-9]| [1-9])/,
    DD: /(3[0-2]|[1-2]\d|0[1-9]|[1-9]| [1-9])/,
    H: /(2[0-3]|[0-1]\d|\d)/,
    HH: /(2[0-3]|[0-1]\d|\d)/,
    hh: /(1[0-2]|0[1-9]|[1-9])/,
    mm: /([0-5]\d|\d)/,
    ss: /([0-5]\d|\d)/,
    SSS: /(\d\d\d)/,
    A: /(AM|PM)/,
    a: /(am|pm)/,
    MMMM: seqToRE(MONTHS_EN),
    MMM: seqToRE(MONTHS_SHORT_EN),
    dddd: seqToRE(WEEKDAYS_LONG_EN),
    ddd: seqToRE(WEEKDAYS_SHORT_EN),
    dd: seqToRE(WEEKDAYS_SHORT_EN),
    d: /([0-6])/,
};
function tokensToRegex(arr) {
    const dateTokens = [];
    const regexParts = [];
    for (const token of arr) {
        if (token in TOKEN_TO_REGEX) {
            dateTokens.push(token);
            regexParts.push(TOKEN_TO_REGEX[token].source);
        }
        else {
            regexParts.push(token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
        }
    }
    const regexString = regexParts.join('');
    return {
        dateTokens,
        regex: new RegExp(`^${regexString}$`),
    };
}
function getDateParams(dateTokens, match) {
    // month and day are set to 1 in default
    let [year, month, day, hour, hour12, minute, second, ms] = [0, 1, 1, 0, 0, 0, 0, 0];
    let isPM = false;
    let is12hourFormat = false;
    for (let i = 0; i < dateTokens.length; i++) {
        const token = dateTokens[i];
        const matchData = parseInt(match[i + 1]);
        switch (token) {
            case 'YYYY':
                year = matchData;
                break;
            case 'YY':
                year = 2000 + parseInt(match[i]);
                break;
            case 'MM':
            case 'M':
                month = matchData;
                break;
            case 'MMMM':
                month = MONTHS_EN.indexOf(match[i + 1]) + 1;
                break;
            case 'MMM':
                month = MONTHS_SHORT_EN.indexOf(match[i + 1]) + 1;
                break;
            case 'DD':
            case 'D':
                day = matchData;
                break;
            case 'HH':
            case 'H':
                hour = matchData;
                break;
            case 'hh':
            case 'h':
                hour12 = matchData;
                is12hourFormat = true;
                break;
            case 'mm':
            case 'm':
                minute = matchData;
                break;
            case 'ss':
            case 's':
                second = matchData;
                break;
            case 'SSS':
                ms = matchData;
                break;
            case 'A':
            case 'a':
                isPM = match[i + 1].toLowerCase() === 'pm';
        }
    }
    if (is12hourFormat) {
        hour = hour12 + (isPM ? 12 : 0);
    }
    return {
        year,
        month0: month - 1,
        day,
        hour,
        minute,
        second,
        ms,
    };
}
function parseFormat(dateString, format) {
    const formatTokens = parseFormatTokens(format);
    const { dateTokens, regex: formatRegex } = tokensToRegex(formatTokens);
    const match = dateString.match(formatRegex);
    if (!match) {
        throw new Error('Invalid date format');
    }
    const { year, month0, day, hour, minute, second, ms } = getDateParams(dateTokens, match);
    return [year, month0, day, hour, minute, second, ms];
}

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
        else if (args.length === 2 &&
            typeof args[0] === 'string' &&
            typeof args[1] === 'string') {
            const [dateTimeString, format] = args;
            this.set.apply(this, parseFormat(dateTimeString, format));
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
