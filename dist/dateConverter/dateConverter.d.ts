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
