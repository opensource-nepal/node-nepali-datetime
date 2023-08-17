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
export declare function parse(dateTimeString: string): number[];
export declare function parseFormat(dateString: string, format: string): number[];
