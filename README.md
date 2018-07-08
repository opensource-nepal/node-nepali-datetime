# nepali-date
A Nepali Date library for nepali date parsing and formatting.

The lunar calendar based on Bikram Samvat seems to have varied 
from it's original specification. As the number of days on each
month do not adhere to their standards when checked over a period.
<pre>
1 Baishakh	30.950 exactly
2 Jestha	31.429 exactly
3 Ashadh	31.638 exactly
4 Shrawan	31.463 exactly
5 Bhadra	31.012 exactly
6 Ashwin	30.428 exactly
7 Kartik	29.879 exactly
8 Mangsir	29.475 exactly
9 Poush		29.310 exactly
10 Magh		29.457 exactly
11 Falgun	29.841 exactly
12 Chaitra	30.377 exactly
+++++++++++++++++++++++++++++++
Total		365.259
</pre>
*The exact length of each month is the time taken by the Sun to move through a full zodiac sign.*

Since, the nepali calendar didn't follow this closely. We have to use
a map based implementation. So, the library would work only within a
certain period of time. At the moment it works between **2000 BS** to **2100 BS**.

# Installation
> `$ yarn add nepali-date`

or

> `$ npm install nepali-date`

# Usage
```javascript
const NepaliDate = require('nepali-date');

const d1 = new NepaliDate('2075-03-05');
const d2 = new NepaliDate('2075/3/5');
const d3 = new NepaliDate('2075.03.5');
const dp1 = new NepaliDate('2075/03'); // 2075/03/01
const dp2 = new NepaliDate('2075'); // 2075/01/01

// Create one from English Date
const d4 = new NepaliDate(new Date('2017-01-15')); 

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
d6.format('mmmm d, yyyy ddd'); // जेष्ठ १, २०७५ मंगल
d6.format('MMM D, YYYY DDD'); // Jes 1, 2075 Tue

// Retrieve english date from NepaliDate
d1.getEnglishDate(); // Return Date object
d1.getTime();        // Return timestamp in milliseconds
```
# Bonus
Install the package globally and get access to command lines `ad2bs`
and `bs2ad` to convert dates from one format to another from command line.

> `npm install -g nepali-date`

or 

> `yarn global add nepali-date`

This will install the nepali-date library globally, installing `ad2bs`
and `bs2ad` as command lines.

> `ad2bs 2018-01-01`<br/>
> `bs2ad 2075-01-01`<br/>

# API
## Constructors
* `new NepaliDate()`<br/>
   Create a nepali date for current time.

* `new NepaliDate(string)`<br/>
   Create a date parsing string in the following format `yyyy[./-]mm[./-].dd`.<br/>
   > `new NepaliDate('2075-03-05')`<br/> 
     `new NepaliDate('2075/3/23')`<br/>
     `new NepaliDate('2075.1.24')`<br/>
     `new NepaliDate('2075.1') // Day is 1 by default`</br>
     `new NepaliDate('2075') // Month and Day is 1 by default`<br/>
   
   If string is not a valid date, an error is thrown

* `new NepaliDate(year, monthIndex, day)`<br/>
  Create nepali date for the given year, month and day. Note that the month
  value is an index starting at 0, i.e., 0 for Baisakh, 1 for Jestha and 
  so on. The values do not need to be bound to the valid values, but would 
  correctly round off for any value for monthIndex or day. For example, 
  monthIndex 12 would mean month 0 for year + 1. Similarly, the day values 
  will also perform the similar transformation, for example. day 40 would 
  mean day 8, 9, 10, or 11 of next month depending on the number of days 
  in the given month.
  > `new NepaliDate(2075, 0, 1); // 2075/01/01`<br/>

* `new NepaliDate(timestamp)`<br/>
  Create nepali date from a unix timestamp (number of milliseconds since
  epoch similar to the one used by Date).
  > `new NepaliDate(Date.now()) // Create current date`

* `new NepaliDate(Date)`<br/>
  Create nepali date from javascript Date.
  > `new NepaliDate(new Date('2017/01/23')) // 2073/10/10`<br/>
* `new NepaliDate(NepaliDate)`<br/>
  Create a clone of another `NepaliDate`.


## getYear()
Retrieve full nepali year (2074, 2075, etc)

## getMonth()
Retrieve month index (0 for Baisakh, 1 for Jestha) so on.

## getDate()
Retrieve day of month (1, 2, ...)

## getHours(), getMinutes(), getSeconds(), getMilliseconds()
Hours, minutes, seconds and milliseconds similar to javascript `Date`.

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
yyyy - 4 digit of year in nepali unicode (२०७५)
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
dd   - Day of Month with zero padding in Nepali unicode (०१, ०२, ...)
DDD  - Day of Week short form (Sun, Mon, Tue, ...)
ddd  - Day of week in short form nepali (आइत, सोम, ...)
DDDD - Day of week full form (Sunday, Monday, Tuesday, ...)
dddd - Day of week full form nepali (आइतबार, सोमबार, ...)
</pre>
Any other character is printed as is. If you need to print the
special characters (YMDymd), enclose them within quotes.





