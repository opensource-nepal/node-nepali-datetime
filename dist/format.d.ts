interface NepaliDate {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    weekDay: number;
    getYear: () => number;
    getMonth: () => number;
    getDate: () => number;
    getHours: () => number;
    getMinutes: () => number;
    getSeconds: () => number;
    getMilliseconds: () => number;
}
export declare function format(nepaliDate: NepaliDate, formatStr: string): string;
export declare function formatNepali(nepaliDate: NepaliDate, formatStr: string): string;
/**
 * Converts a NepaliDate object to a toString() representation.
 * Returns in format YYYY-MM-DD HH:mm:ss[.SSS].
 * This method is light-weight than format/formatNepali method.
 *
 * @param nepaliDate - The NepaliDate object to be converted.
 * @returns The formatted string representation of the NepaliDate.
 */
export declare function nepaliDateToString(nepaliDate: NepaliDate): string;
export {};
