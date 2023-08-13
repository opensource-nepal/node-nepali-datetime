interface NepaliDate {
    getYear: () => number;
    getMonth: () => number;
    getDate: () => number;
    getDay: () => number;
    getHours: () => number;
    getMinutes: () => number;
    getSeconds: () => number;
    getMilliseconds: () => number;
}
/**
 * Returns a string representation (in English) of the NepaliDate object in the specified format.
 *
 * @param {NepaliDate} nepaliDate - The Nepali date object to be formatted.
 * @param {string} format - The format string for the desired output.
 * @returns {string} - The formatted Nepali date string.
 */
export declare const format: (nepaliDate: NepaliDate, format: string) => string;
/**
 * Returns a string representation in the Nepali (Devanagari) of the NepaliDate object in the specified format.
 *
 * @param {NepaliDate} nepaliDate - The Nepali date object to be formatted.
 * @param {string} format - The format string for the desired output.
 * @returns {string} - A string representation of the NepaliDate object in the specified format.
 */
export declare const formatNepali: (nepaliDate: NepaliDate, format: string) => string;
/**
 * Converts a NepaliDate object to a toString() representation.
 * Returns in format "YYYY-MM-DD HH:mm:ss[.SSS]".
 * This method is lightweight compared to the format/formatNepali method.
 *
 * @param {NepaliDate} nepaliDate - The NepaliDate object to be converted.
 * @returns {string} The formatted string representation of the NepaliDate.
 */
export declare const nepaliDateToString: (nepaliDate: NepaliDate) => string;
export {};
