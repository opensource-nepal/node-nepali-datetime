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
 * import { englishToNepali, nepaliToEnglish } from './dateConverter';
 *
 * const [npYear, npMonth, npDay] = englishToNepali(2023, 5, 27);
 * console.log(`Nepali Date: ${npYear}-${npMonth}-${npDay}`);
 *
 * const [enYear, enMonth, enDay] = nepaliToEnglish(2080, 2, 15);
 * console.log(`English Date: ${enYear}-${enMonth}-${enDay}`);
 * ```
 *
 * Note: There are two types of month variables used in this file.
 * The first is `month0`, which represents month values starting from 0,
 * for example, 0 for January and 0 for Baishakh.
 * The second is `month`, which represents month values starting from 1.
 */
/**
 * Converts an English date to Nepali date.
 * @param year - The year in English calendar.
 * @param month0 - The month in English calendar. Starting from 0, 0 for January.
 * @param day - The day in English calendar.
 * @returns The corresponding Nepali date as an array of [year, month, day].
 * @throws {DateOutOfRangeError} If the provided date is out of range.
 */
declare function englishToNepali(year: number, month0: number, day: number): [number, number, number];
declare const _default: {
    enMinYear: () => number;
    enMaxYear: () => number;
    npMinYear: () => number;
    npMaxYear: () => number;
    englishToNepali: typeof englishToNepali;
    nepaliToEnglish: (year: number, month0: number, day: number) => [number, number, number];
};
export default _default;
