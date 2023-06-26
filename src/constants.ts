export const UTC_OFFSET_IN_MS = 20700000 // 5 hours 45 minutes in ms

// timezone reference for +5:30
export const OLD_UTC_OFFSET_IN_MS = 19800000 // 5 hours 40 minutes in ms

// 504901800000: Wed Jan 01 1986 00:15:00 GMT+0545 (Nepal Time)
// is the timezone transition date on JavaScript
export const TIMEZONE_TRANSITION_TIMESTAMP = 504901800000
export const TIMEZONE_TRANSITION_DATE_REFERENCE = new Date(1986, 0, 1, 0, 15)