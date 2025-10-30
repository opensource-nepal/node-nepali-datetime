# nepali-datetime

[![npm version](https://img.shields.io/npm/v/nepali-datetime?color=48c21a)](https://www.npmjs.com/package/nepali-datetime)
[![Github CI](https://github.com/opensource-nepal/node-nepali-datetime/actions/workflows/ci.yml/badge.svg)](https://github.com/opensource-nepal/node-nepali-datetime/actions/workflows/ci.yml)
[![Downloads](https://img.shields.io/npm/dm/nepali-datetime?maxAge=180)](https://www.npmjs.com/package/nepali-datetime)
[![codecov](https://codecov.io/gh/opensource-nepal/node-nepali-datetime/branch/main/graph/badge.svg?token=KAKOA8A036)](https://codecov.io/gh/opensource-nepal/node-nepali-datetime)
[![License](https://img.shields.io/npm/l/nepali-datetime?label=License)](https://github.com/opensource-nepal/node-nepali-datetime/blob/main/LICENSE)

nepali-datetime is a Node.js package designed to provide native JavaScript-like features for Nepali dates. It includes the 'NepaliDate' class for Nepali date support and the 'dateConverter' module for date conversion.

## Examples

Here are a few examples to get you started:

```javascript
import NepaliDate from 'nepali-datetime'

// Create a NepaliDate object for the current date and time
const now = new NepaliDate()
console.log(now.toString()) // 2080-03-23 15:32:03.643

// Create a NepaliDate object from a Nepali date string
const date1 = new NepaliDate('2079-02-15 23:11')
console.log(date1.toString()) // 2079-02-15 23:11:00

// Parse Nepali date string
const date2 = new NepaliDate('Baisakh 18, 2080', 'MMMM D, YYYY')
console.log(date2.toString()) // 2080-01-18 00:00:00

// Format a NepaliDate object
const formattedDate = now.format('YYYY-MM-DD')
console.log(formattedDate) // 2080-03-23

// Create a NepaliDate object from an English date string
const date3 = NepaliDate.parseEnglishDate('2023-07-08', 'YYYY-MM-DD')
console.log(date3.toString()) // 2080-03-23 00:00:00
```

## Installation

To install nepali-datetime, you can use npm or yarn:

```shell
npm install nepali-datetime
```

or

```shell
yarn add nepali-datetime
```

## Usage

### NepaliDate

The `NepaliDate` class represents a Nepali calendar date. It provides various methods and properties to work with Nepali dates.

#### Creating a NepaliDate object

You can create a `NepaliDate` object in several ways:

- Without any parameters: Creates a `NepaliDate` object for the current date and time.

    ```javascript
    import NepaliDate from 'nepali-datetime'

    const now = new NepaliDate()
    ```

- Using a Nepali date string: Parses the string as a Nepali calendar date.

    ```javascript
    const date1 = new NepaliDate('2079-02-15')
    const date2 = new NepaliDate('2079-02-15 14:00')
    ```

- Using a Unix timestamp (in milliseconds):

    ```javascript
    const date2 = new NepaliDate(1654210800000)
    ```

- Using a JavaScript `Date` object: Converts the JavaScript `Date` object to a `NepaliDate` object.

    ```javascript
    const jsDate = new Date()
    const date3 = new NepaliDate(jsDate)
    ```

- Using an existing `NepaliDate` object: Creates a new `NepaliDate` object with the same values.

    ```javascript
    const date4 = new NepaliDate(date3)
    ```

- Using Nepali calendar date and time parameters: Specifies the components of a Nepali calendar date.

    ```javascript
    const date5 = new NepaliDate(year, month, date, hour, minute, second, ms)
    const date6 = new NepaliDate(2079, 2, 15, 10, 30)
    ```

#### Getting the Nepali date components

You can retrieve various components of a `NepaliDate` object using the following methods:

- `getDateObject()`: Retrieves the Javascript Date object equivalent to the NepaliDate.
- `getTime()`: Retrieves the Unix timestamp (in milliseconds) of the Nepali date.
- `getYear()`: Retrieves the year of the Nepali date in the Nepali calendar.
- `getEnglishYear()`: Retrieves the year of the Nepali date in the English calendar.
- `getMonth()`: Retrieves the month of the Nepali date in the Nepali calendar.
- `getEnglishMonth()`: Retrieves the month of the Nepali date in the English calendar.
- `getDate()`: Retrieves the day of the month of the Nepali date in the Nepali calendar.
- `getEnglishDate()`: Retrieves the day of the month of the Nepali date in the English calendar.
- `getDay()`: Retrieves the day of the week represented by a numeric value.
- `getHours()`: Retrieves the hour value of the Nepali date.
- `getMinutes()`: Retrieves the minute value of the Nepali date.
- `getSeconds()`: Retrieves the second value of the Nepali date.
- `getMilliseconds()`: Retrieves the millisecond value of the Nepali date.

#### Setting the Nepali date components

You can set individual components of a `NepaliDate` object using the following methods:

- `setYear(year)`: Sets the year of the Nepali date.
- `setMonth(month)`: Sets the month of the Nepali date.
- `setDate(day)`: Sets the day of the month of the Nepali date.
- `setHours(hour)`: Sets the hour of the Nepali date.
- `setMinutes(minute)`: Sets the minute of the Nepali date.
- `setSeconds(second)`: Sets the second of the Nepali date.
- `setMilliseconds(ms)`: Sets the millisecond of the Nepali date.
- `setTime(time)`: Sets the Nepali date and time values using a Unix timestamp.

#### Formatting the Nepali date

You can format a `NepaliDate` object as a string using the `format()` and `formatNepali()` methods.
Additionally, you can convert the corresponding English date to a string using the `formatEnglishDate()` and `formatEnglishDateInNepali()` methods.

- `format(formatStr)`: Returns a string representation (in English) of the `NepaliDate` object in the specified format.
- `formatNepali(formatStr)`: Returns a string representation in the Nepali (Devanagari script) of the `NepaliDate` object in the specified format.
- `formatEnglishDate(formatStr)`: Returns a string representation (in English) of the English Date in the specified format.
- `formatEnglishDateInNepali(formatStr)`: Returns a string representation in the Nepali (Devanagari script) of the English Date in the specified format.

```javascript
const date = new NepaliDate(2079, 5, 3, 16, 14)
console.log(date.format('YYYY-MM-DD hh:mm A')) // 2079-06-03 04:14 PM
console.log(date.formatEnglishDate('YYYY-MM-DD hh:mm A')) // 2022-09-19 04:14 PM
```

The date formatting will follow the format codes mentioned below, which are similar to the date formats used in day.js.

| Format Token | Description                       | Example  |
| ------------ | --------------------------------- | -------- |
| YYYY         | 4-digit year                      | 2023     |
| YY           | 2-digit year                      | 23       |
| MMMM         | Full month name                   | Baisakh  |
| MMM          | Abbreviated month name            | Bai      |
| MM           | 2-digit month                     | 01-12    |
| M            | Month number, beginning at 1      | 1-12     |
| DD           | 2-digit day of the month          | 01-31    |
| D            | Day of the month                  | 1-31     |
| dddd         | Full day of the week              | Monday   |
| ddd          | Abbreviated day of the week       | Mon      |
| d            | Day of the week, with Sunday as 0 | 0-6      |
| HH           | 2-digit hour (24-hour format)     | 00-23    |
| H            | Hour (24-hour format)             | 0-23     |
| hh           | 2-digit hour (12-hour format)     | 01-12    |
| h            | Hour (12-hour format)             | 1-12     |
| mm           | 2-digit minutes                   | 00-59    |
| m            | Minutes                           | 0-59     |
| ss           | 2-digit seconds                   | 00-59    |
| s            | Seconds                           | 0-59     |
| SSS          | 3-digit milliseconds              | 000-999  |
| A            | Uppercase AM/PM                   | AM or PM |
| a            | Lowercase am/pm                   | am or pm |

Any other character will be printed as it is. If you need to print the special characters (YMDmd), please enclose them within square brackets. Example: `.format("[YMDmd]")`

For the list of month names and their abbreviations, you can refer to the table below.

| Value of Month | Abbreviation | Full Name |
| -------------- | ------------ | --------- |
| 0              | Bai          | Baisakh   |
| 1              | Jes          | Jestha    |
| 2              | Asa          | Asar      |
| 3              | Shr          | Shrawan   |
| 4              | Bhd          | Bhadra    |
| 5              | Asw          | Aswin     |
| 6              | Kar          | Kartik    |
| 7              | Man          | Mangsir   |
| 8              | Pou          | Poush     |
| 9              | Mag          | Magh      |
| 10             | Fal          | Falgun    |
| 11             | Cha          | Chaitra   |

#### Parsing Dates

You can parse a date-time string into a `NepaliDate` object using the following methods:

- `new NepaliDate(dateString, formatStr)`: Parses an Nepali date-time string according to the specified format.
- `NepaliDate.parseNepaliFormat(dateStringNe, formatStr)`: Parses a Nepali date-time string in Devanagari form according to the specified format.
- `NepaliDate.parseEnglishDate(dateString, formatStr)`: Parses an English date-time string according to the specified format.

#### Converting to JavaScript Date object

You can get the equivalent JavaScript `Date` object of a `NepaliDate` object using the `getDateObject()` method.

```javascript
const now = new NepaliDate(2079, 5, 3)
console.log(now.getDateObject()) // Date 2022-09-18T18:15:00.000Z
```

#### Creating a NepaliDate object from an English date

You can create a `NepaliDate` object from an English calendar date using the `parseEnglishDate` or `fromEnglishDate` method.

```javascript
const date1 = NepaliDate.parseEnglishDate('2023-07-08', 'YYYY-MM-DD')
console.log(date1.toString()) // 2080-03-23 00:00:00

const date2 = NepaliDate.fromEnglishDate(2023, 6, 8, 10, 15)
console.log(date2.toString()) // 2080-03-23 10:15:00
```

#### Others

- `NepaliDate.getDaysOfMonth(year, month)`: Returns the number of days in a specific month of a given year.
- `NepaliDate.minSupportedDate()`: Returns the minimum supported JS Date object.
- `NepaliDate.maxSupportedDate()`: Returns the maximum supported JS Date object.
- `NepaliDate.minSupportedNepaliDate()`: Returns the minimum supported Nepali object.
- `NepaliDate.maxSupportedNepaliDate()`: Returns the maximum supported Nepali object.

### NepalTimezoneDate

The `NepalTimezoneDate` class provides Gregorian date/time values in Nepal's timezone (Asia/Kathmandu, UTC+05:45).  
It works like JavaScript's `Date`, but always returns values as they would appear in Nepal, regardless of your system's timezone.  
It does **not** convert to the Nepali calendar.

#### Creating a NepalTimezoneDate object

You can create a `NepalTimezoneDate` object in several ways:

```javascript
import { NepalTimezoneDate } from 'nepali-datetime'

// Current date/time in Nepal timezone
const nowNepal = new NepalTimezoneDate()

// From a UTC date string
const dateNepal = new NepalTimezoneDate('2024-12-28T15:00:35Z')

// From a JS Date object
const jsDate = new Date('2024-12-28T15:00:35Z')
const nepalDate = new NepalTimezoneDate(jsDate)

// From Nepal time components (year, month [0-based], date, hour, minute, second, ms)
const npTzDate = new NepalTimezoneDate(2024, 11, 28, 20, 45, 35)
```

#### Getting Nepal timezone date components

```javascript
npTzDate.getYear() // 2024
npTzDate.getMonth() // 11 (December, 0-based)
npTzDate.getDate() // 28
npTzDate.getHours() // 20
npTzDate.getMinutes() // 45
npTzDate.toString() // "2024-12-28 20:45:35 GMT+0545"
npTzDate.toDate() // JS Date object in UTC
```

#### Converting NepalTimezoneDate to NepaliDate

You can convert a `NepalTimezoneDate` object (Gregorian date in Nepal timezone) to a `NepaliDate` object:

```javascript
const npTzDate = new NepalTimezoneDate('2024-12-28T15:00:35Z')
const nepaliDate = new NepaliDate(npTzDate)
console.log(nepaliDate.toString()) // e.g. 2081-09-12 20:45:35
```

#### Comparing with JS Date

```javascript
const systemDate = new Date('2024-12-28T15:00:35Z')
const nepalDate = new NepalTimezoneDate('2024-12-28T15:00:35Z')

// System Date (depends on your computer's timezone)
console.log(systemDate.getHours()) // e.g. 10 (US), 16 (EU), 20 (Nepal)

// NepalTimezoneDate (always Nepal time)
console.log(nepalDate.getHours()) // 20
console.log(nepalDate.toString()) // "2024-12-28 20:45:35 GMT+0545"
```

### dateConverter

The `dateConverter` module provides core functions for converting dates between the Nepali and English calendars.

- `englishToNepali(year, month, day)`: Converts an English calendar date to a Nepali calendar date. Returns an array `[npYear, npMonth, npDay]` representing the Nepali date.
- `nepaliToEnglish(year, month, day)`: Converts a Nepali calendar date to an English calendar date. Returns an array `[enYear, enYear, enDay]` representing the English date.

> Note: Use 0 as the value for the months Baisakh and January (Javascript Logic 🤷).

```javascript
import dateConverter from 'nepali-datetime/dateConverter'

// english to nepali date conversion
const [npYear, npMonth, npDay] = dateConverter.englishToNepali(2023, 5, 27)

// nepali to english date conversion
const [enYear, enMonth, enDay] = dateConverter.nepaliToEnglish(2080, 2, 15)
```

#### Quick Date conversion using NepaliDate

The `NepaliDate` class can also be used for direct string-to-string date conversions, eliminating the need for custom parsing or formatting logic.

**English Date to Nepali Date**

```javascript
const enDate = '2024-11-25'
const npDate = NepaliDate.parseEnglishDate(enDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
// 2081-08-10
```

**Nepali Date to English Date**

```javascript
const npDate = '2081-08-10'
const enDate = new NepaliDate(npDate).formatEnglishDate('YYYY-MM-DD')
// 2024-11-25
```

## Acknowledgements

This project was inspired by [nepali-date](https://github.com/sharingapples/nepali-date). We would like to express our gratitude to their team for their excellent work and ideas, which served as a motivation for this project.

## Contribution

We appreciate feedback and contribution to this package. To get started please see our [contribution guide](CONTRIBUTING.md).
