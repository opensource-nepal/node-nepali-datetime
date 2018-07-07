# nepali-date
A Nepali Date library for nepali date parsing and formatting.

# Installation
> `$ yarn install nepali-date`

or

> `$ npm install nepali-date`

# Usage
```javascript
const NepaliDate = require('nepali-date');

const d1 = new NepaliDate('2075-03-05');
const d2 = new NepaliDate('2075/3/5');
const d3 = new NepaliDate('2075.03.5');

// Create one from English Date
const d4 = new NepaliDate(new Date('2017-01-15)); 

// Create using year, month, date
const d5 = new NepaliDate(2075, 0, 1); 
    // Note that the month starts with 0 (for Baisakh)
    // To make it work similar with javascript Date object
  
// You could also use values higher or lower (negative) to wrap around
const d6 = new NepaliDate(2075, 13, 1); // '2076/2/1'
const d7 = new NepaliDate(2075, -1, 1); // '2074/12/1'

// Format date in nepali 
d6.format('yyyy-mm-dd'); // २०७५-०२-०१
d6.format('YYY-MM-DD'); // 075-02-01
d6.format('mmmm d, yyyy ddd); // जेष्ठ १, २०७५ मंगल
d6.format('MMM D, YYYY DDD); // Jes 1, 2075 Tue

// Retrieve english date from NepaliDate
d1.getEnglishDate(); // Return Date object
d1.getTime();        // Return timestamp in milliseconds
```

# API
## constructor
`new NepaliDate(string)`  
`new NepaliDate(year, monthIndex, day)`  
`new NepaliDate(timestamp)`  
`new NepaliDate(Date)`  
`new NepaliDate(NepaliDate)`  

## getYear()
Retrieve full nepali year (2074, 2075, etc)

## getMonth()
Retrieve month index (0 for Baisakh, 1 for Jestha) so on.

## getDate()
Retrieve day of month (1, 2, ...)

## getHours(), getMinutes(), getSeconds()
Hours, minutes and seconds similar to date

## getEnglishDate()
Retrieve Date object corresponding to the Nepali date

## set(year, month, date)
Change date to given year, month and day of month

## setYear(year)
Change the year of the existing date, without changing
other parameters (month, date)

## setMonth(monthIndex)
Change the month of the existing date, without chaning
other parameters (year, date). Note that the values can extend
beyong 0-11, which leads to change in year values as well. Ex, 
setting month to 12 will set month to Baisakh of next year, similarly
setting month to -1 will set month to Chaitra of previous year.

## setDate(day)
Change the day of month of the existing date, without changing
other parameters (year, month). Note that the values can extend
beyond the normal days in month. Ex, setting day to 0, will change
the date to the last date of previous month, setting date to 35 will
change the date to some day in the next month (3, 4, 5, depending on
how many days are there in the month)

## format(formatStr)
Format the date to provide various output based on format string
<pre>
YYYY - 4 digit of year (2075)
yyyy - 4 digit o year in nepali unicode (२०७५)
YYY  - 3 digit of year (075)
yyy  - 3 digit of year (०७५)
YY   - 2 digit of year
yy   - 2 digit of year in nepali unicode (७५)
M    - month number (1 - 12)
m    - month number (१ - १२) in nepali unicode
MM   - month number with 0 padding (01 - 12)
mm   - month number in nepali unicode with 0 padding - (०१-१२)
MMM  - short month name (Bai, Jes, Asa, Shr, etc.)
mmm  - short month name in nepali unicde (ब‍ै, जे, अ, श्रा, etc)
MMMM - full month name (Baisakh, Jestha, Asar, ...)
mmmm - full month name nepali (बैसाख, जेष्ठ, ...)
D    - Day of Month (1, 2, ... 31, 32)
d    - Day of Month in Nepali unicode (१, २, ३ ... ३१, ३२)
DD   - Day of Month with zero padding (01, 02, ...)
dd   - Day of Month wiht zero padding in Nepali unicode (०१, ०२, ...)
DDD  - Day of Week short form (Sun, Mon, Tue, ...)
ddd  - Day of week in short form nepali (आइत, सोम, ...)
DDDD - Day of week full form (Sunday, Monday, Tuesday, ...)
dddd - Day of week full form nepali (आइतबार, सोमबार, ...)
</pre>
Any other character is printed as is. If you need to print the
special characters (YMDymd), enclose them within quotes.





