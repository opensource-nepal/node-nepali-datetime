/**
 * validators.ts
 *
 * This file contains utility functions for validating data.
 */
/**
 * Custom validation error.
 */
export declare class ValidationError extends Error {
    constructor(message: string);
}
/**
 * Validates the given hour value.
 *
 * @param hour - The hour value to validate.
 * @throws {ValidationError} - If the hour is not within the range of 0-23.
 */
export declare const validateHour: (hour: number) => void;
/**
 * Validates the given minute value.
 *
 * @param minute - The minute value to validate.
 * @throws {ValidationError} - If the minute is not within the range of 0-59.
 */
export declare const validateMinute: (minute: number) => void;
/**
 * Validates the given second value.
 *
 * @param second - The second value to validate.
 * @throws {ValidationError} - If the second is not within the range of 0-59.
 */
export declare const validateSecond: (second: number) => void;
/**
 * Validates the given millisecond value.
 *
 * @param millisecond - The millisecond value to validate.
 * @throws {ValidationError} - If the millisecond is not within the range of 0-999.
 */
export declare const validateMillisecond: (millisecond: number) => void;
/**
 * Validates the time components.
 * @param hour - The hour component of the time.
 * @param minute - The minute component of the time.
 * @param second - The second component of the time.
 * @param ms - The millisecond component of the time.
 * @throws {ValidationError} if any of the time components are out of range.
 */
export declare const validateTime: (hour: number, minute: number, second: number, ms: number) => void;
