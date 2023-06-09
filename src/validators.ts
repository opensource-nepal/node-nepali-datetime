/**
 * validators.ts
 *
 * This file contains utility functions for validating data.
 */

/**
 * Custom validation error.
 */
export class ValidationError extends Error {
    constructor(message: string) {
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
export const validateHour = (hour: number) => {
    if (hour < 0 || hour > 23)
        throw new ValidationError("Hour should be in the range 0-23");
}

/**
 * Validates the given minute value.
 * 
 * @param minute - The minute value to validate.
 * @throws {ValidationError} - If the minute is not within the range of 0-59.
 */
export const validateMinute = (minute: number) => {
    if (minute < 0 || minute > 59)
        throw new ValidationError("Minute should be in the range 0-59");
}

/**
 * Validates the given second value.
 * 
 * @param second - The second value to validate.
 * @throws {ValidationError} - If the second is not within the range of 0-59.
 */
export const validateSecond = (second: number) => {
    if (second < 0 || second > 59)
        throw new ValidationError("Second should be in the range 0-59");
}

/**
 * Validates the given millisecond value.
 * 
 * @param millisecond - The millisecond value to validate.
 * @throws {ValidationError} - If the millisecond is not within the range of 0-999.
 */
export const validateMillisecond = (millisecond: number) => {
    if (millisecond < 0 || millisecond > 999)
        throw new ValidationError("Millisecond should be in the range 0-999");
}


/**
 * Validates the time components.
 * @param hour - The hour component of the time.
 * @param minute - The minute component of the time.
 * @param second - The second component of the time.
 * @param ms - The millisecond component of the time.
 * @throws {ValidationError} if any of the time components are out of range.
 */
export const validateTime = (hour: number, minute: number, second: number = 0, ms: number = 0) => {
    validateHour(hour)
    validateMinute(minute)
    validateSecond(second)
    validateMillisecond(ms)
}