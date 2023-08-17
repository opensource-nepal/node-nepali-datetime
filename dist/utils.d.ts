/**
 * Get the Nepali date and time components (Gregorian calendar) from a given date.
 * The input can be any date from any timezone, it is converted into the Nepal's timezone (Asia/Kathmandu).
 *
 * @param date - The input date for which to retrieve the Nepali date and time.
 * @returns An object containing the Nepali date and time components.
 */
export declare const getNepalDateAndTime: (date: Date) => {
    year: number;
    month0: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    ms: number;
    weekDay: number;
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
export declare const getDate: (year: number, month: number, day: number, hour: number, minute: number, second: number, ms: number) => Date;
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
export declare const parseFormatTokens: (format: string) => string[];
/**
 * Converts a list of strings to a regex string.
 * It takes possible matching values to be from longest to shortest.  This
 * prevents the possibility of a match occurring for a value that also
 * a substring of a larger value that should have matched (e.g., 'abc'
 * matching when 'abcdef' should have been the match).
 *
 * @param toConvert - An array of string containing all the required regex values
 */
export declare const seqToRE: (toConvert: Array<string>) => RegExp;
