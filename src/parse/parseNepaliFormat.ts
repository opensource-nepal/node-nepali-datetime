/**
 * This module provides methods for parsing Nepali Date strings (in Devanagari).
 */

import {
    NEPALI_MONTHS_EN,
    NEPALI_MONTHS_NE,
    NUM_NE,
    WEEKDAYS_LONG_EN,
    WEEKDAYS_LONG_NE,
    WEEKDAYS_SHORT_EN,
    WEEKDAYS_SHORT_NE,
} from '../constants'
import { parseFormat } from './parse'

function convertNepaliStringToEnglish(dateStringNe: string): string {
    const regexLookup: Record<string, string> = {
        एम: 'AM',
        पिम: 'PM',
    }
    NEPALI_MONTHS_NE.forEach((ne, i) => (regexLookup[ne] = NEPALI_MONTHS_EN[i]))
    WEEKDAYS_LONG_NE.forEach((ne, i) => (regexLookup[ne] = WEEKDAYS_LONG_EN[i]))
    WEEKDAYS_SHORT_NE.forEach((ne, i) => (regexLookup[ne] = WEEKDAYS_SHORT_EN[i]))
    NUM_NE.forEach((ne, i) => (regexLookup[ne] = String(i)))

    // create a regex pattern
    const pattern = new RegExp(Object.keys(regexLookup).join('|'), 'g')

    // replace the match
    return dateStringNe.replace(pattern, match => regexLookup[match])
}

export function parseNepaliFormat(dateStringNe: string, format: string): number[] {
    const convertedDateString = convertNepaliStringToEnglish(dateStringNe)
    return parseFormat(convertedDateString, format)
}
