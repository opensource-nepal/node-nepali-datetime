// Reference date for conversion is 2000/01/01 BS and 1943/4/14 AD
export const NP_INITIAL_YEAR = 2000
export const REFERENCE_EN_DATE: [number, number, number] = [1943, 4, 14]

// English month constant data (will never change)
export const EN_MONTHS: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const EN_LEAP_YEAR_MONTHS: number[] = [
    31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
] // Leap year months (Just 29 on Feb)

// Nepali months data
export const NP_MONTHS_DATA: Array<[number[], number]> = [
    [[30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], 365], // 2000 BS - 1943/1944 AD
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365], // 2001 BS
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
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], 365], // 2080
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], 366], // 2081
    [[31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], 365], // 2082
    [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], 365],
    [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], 366],
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
    [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], 365], // 2099 BS - 2042/2043 AD
]
