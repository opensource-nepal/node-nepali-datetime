'use strict';

const EPOCH = new Date(1943, 3, 14).getTime();
const START_YEAR = 2000;
// const MAX_DATE = new Date(2032, 4, 14);
const NEPALI_DATE_MAP = [
    [2000, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
    [2001, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2002, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    [2003, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2004, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
    [2005, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2006, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    [2007, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2008, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
    [2009, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2010, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    [2011, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2012, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
    [2013, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2014, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    [2015, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2016, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
    [2017, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2018, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    [2019, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
    [2020, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2021, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2022, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
    [2023, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
    [2024, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2025, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2026, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2027, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
    [2028, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2029, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365],
    [2030, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2031, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
    [2032, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2033, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    [2034, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2035, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
    [2036, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2037, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    [2038, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2039, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
    [2040, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2041, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    [2042, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2043, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
    [2044, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2045, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    [2046, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2047, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2048, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2049, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
    [2050, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
    [2051, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2052, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2053, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
    [2054, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
    [2055, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2056, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365],
    [2057, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2058, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
    [2059, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2060, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    [2061, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2062, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31, 365],
    [2063, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2064, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    [2065, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2066, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
    [2067, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2068, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    [2069, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2070, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
    [2071, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2072, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    [2073, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    [2074, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2075, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2076, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
    [2077, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
    [2078, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2079, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    [2080, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
    [2081, 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366],
    [2082, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    [2083, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    [2084, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    [2085, 31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30, 366],
    [2086, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    [2087, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366],
    [2088, 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30, 365],
];
// Include the progressive sum at the end of the array
NEPALI_DATE_MAP.forEach((l, idx, arr) => {
    l.push(l[13] + (idx === 0 ? 0 : arr[idx - 1][14]));
});

const MONTHS_EN = [
    "Baisakh",
    "Jestha",
    "Asar",
    "Shrawan",
    "Bhadra",
    "Aswin",
    "Kartik",
    "Mangsir",
    "Poush",
    "Magh",
    "Falgun",
    "Chaitra",
];
const MONTHS_SHORT_EN = ["Bai", "Jes", "Asa", "Shr", "Bhd", "Asw", "Kar", "Man", "Pou", "Mag", "Fal", "Cha"];
const MONTHS_NP = [
    "बैशाख",
    "जेठ",
    "असार",
    "श्रावण",
    "भाद्र",
    "आश्विन",
    "कार्तिक",
    "मंसिर",
    "पौष",
    "माघ",
    "फाल्गुण",
    "चैत्र",
];
const MONTHS_SHORT_NP = ["बै", "जे", "अ", "श्रा", "भा", "आ", "का", "मं", "पौ", "मा", "फा", "चै"];
const NUM_NP = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
const WEEKDAYS_SHORT_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_LONG_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAYS_SHORT_NP = ["आइत", "सोम", "मंगल", "बुध", "बिहि", "शुक्र", "शनि"];
const WEEKDAYS_LONG_NP = ["आइतबार", "सोमबार", "मंगलबार", "बुधबार", "बिहिबार", "शुक्रबार", "शनिबार"];
function pad(n) {
    if (n < 10) {
        return `0${n}`;
    }
    return `${n}`;
}
function npDigit(str) {
    let res = "";
    for (let i = 0; i < str.length; i += 1) {
        res += NUM_NP[str.charCodeAt(i) - 48];
    }
    return res;
}
function yearEn(size) {
    return (date) => {
        if (size <= 2) {
            return String(date.year).substring(2);
        }
        if (size === 3) {
            return String(date.year).substring(1);
        }
        return date.year;
    };
}
function yearNp(size) {
    return (date) => {
        if (size <= 2) {
            return npDigit(String(date.year).substring(2));
        }
        if (size === 3) {
            return npDigit(String(date.year).substring(1));
        }
        return npDigit(String(date.year));
    };
}
function monthEn(size) {
    return (date) => {
        if (size === 1) {
            return String(date.month + 1);
        }
        if (size === 2) {
            return pad(date.month + 1);
        }
        if (size === 3) {
            return MONTHS_SHORT_EN[date.month];
        }
        return MONTHS_EN[date.month];
    };
}
function monthNp(size) {
    return (date) => {
        if (size === 1) {
            return npDigit(String(date.month + 1));
        }
        if (size === 2) {
            return npDigit(pad(date.month + 1));
        }
        if (size === 3) {
            return MONTHS_SHORT_NP[date.month];
        }
        return MONTHS_NP[date.month];
    };
}
function dateEn(size) {
    return (date) => {
        if (size === 1) {
            return String(date.day);
        }
        if (size === 2) {
            return pad(date.day);
        }
        if (size === 3) {
            return WEEKDAYS_SHORT_EN[date.getDay()];
        }
        return WEEKDAYS_LONG_EN[date.getDay()];
    };
}
function dateNp(size) {
    return (date) => {
        if (size === 1) {
            return npDigit(String(date.day));
        }
        if (size === 2) {
            return npDigit(pad(date.day));
        }
        if (size === 3) {
            return WEEKDAYS_SHORT_NP[date.getDay()];
        }
        return WEEKDAYS_LONG_NP[date.getDay()];
    };
}
function pass(seq) {
    return () => seq;
}
const fn = {
    Y: yearEn,
    y: yearNp,
    M: monthEn,
    m: monthNp,
    D: dateEn,
    d: dateNp,
};
function isSpecial(ch) {
    return ch in fn;
}
function tokenize(formatStr) {
    let inQuote = false;
    let seq = "";
    let special = "";
    let specialSize = 0;
    const tokens = [];
    for (const ch of formatStr) {
        if (ch === special) {
            specialSize += 1;
            // eslint-disable-next-line no-continue
            continue;
        }
        // Time to process special
        if (special !== "") {
            tokens.push(fn[special](specialSize));
            special = "";
            specialSize = 0;
        }
        if (ch === '"') {
            inQuote = !inQuote;
            // eslint-disable-next-line no-continue
            continue;
        }
        if (!isSpecial(ch) || inQuote) {
            seq += ch;
        }
        else {
            // got a special character
            if (seq) {
                tokens.push(pass(seq));
                seq = "";
            }
            special = ch;
            specialSize = 1;
        }
    }
    if (seq) {
        tokens.push(pass(seq));
    }
    else if (special) {
        tokens.push(fn[special](specialSize));
    }
    return tokens;
}
// Parse the format string for special characters
// YY     2 digit year
// YYY    3 digit year
// YYYY   4 digit year
// yy     2 digit year in Nepali
// yyy    3 digit year in Nepali
// yyyy   4 digit year in Nepali
// M      month number
// MM     0 padded 2 digit month
// MMM    3 character month name
// MMMM   Full month name
// m      digit month in nepali unicode
// mm     0 padded 2 digit month in nepali unicode
// mmm    Partial Month name in nepali unicode
// mmmm   Full month name in nepali unicode
// D      date number
// DD     0 padded date number (2 digit)
// DDD    week day english short form
// DDDD   week day english full form
// d      date number in nepali
// dd     0 padded date number in nepali (2 digit)
// ddd    week day nepali short form
// dddd   week day nepali full form
function format(nepaliDate, formatStr) {
    return tokenize(formatStr)
        .map((f) => f(nepaliDate))
        .join("");
}

const SUM_IDX = 14;
function parse(dateString) {
    // Expected date formats are yyyy-mm-dd, yyyy.mm.dd yyyy/mm/dd
    const parts = dateString.split(/[-./]/, 3);
    const [year, month = 1, day = 1] = parts.map((d) => {
        const n = parseInt(d, 10);
        if (Number.isNaN(n)) {
            throw new Error("Invalid date");
        }
        return n;
    });
    // Make sure we are within range
    if (year < START_YEAR || year >= START_YEAR + NEPALI_DATE_MAP.length) {
        throw new Error("Nepal year out of range");
    }
    if (month < 1 || month > 12) {
        throw new Error("Invalid nepali month must be between 1 - 12");
    }
    const daysInMonth = NEPALI_DATE_MAP[year - START_YEAR][month];
    if (day < 1 || day > daysInMonth) {
        throw new Error(`Invalid nepali date must be between 1 - ${daysInMonth} in ${year} ${month}`);
    }
    return [year, month - 1, day];
}
class NepaliDate {
    timestamp;
    year;
    month;
    day;
    static minimum;
    static maximum;
    constructor(...args) {
        if (args.length === 0) {
            this.setEnglishDate(new Date());
        }
        else if (args.length === 1) {
            const e = args[0];
            if (typeof e === "object") {
                if (e instanceof Date) {
                    this.setEnglishDate(e);
                }
                else if (e instanceof NepaliDate) {
                    this.timestamp = e.timestamp;
                    this.year = e.year;
                    this.month = e.month;
                    this.day = e.day;
                }
                else if (typeof e === "number") {
                    this.setEnglishDate(new Date(e));
                }
                else {
                    throw new Error("Invalid date argument");
                }
            }
            else if (typeof e === "string") {
                // Try to parse the date
                this.set.apply(this, parse(e));
            }
            else {
                throw new Error("Invalid date argument");
            }
        }
        else if (args.length === 3) {
            this.set(args[0], args[1], args[2]);
        }
        else {
            throw new Error("Invalid argument syntax");
        }
    }
    setEnglishDate(date) {
        this.timestamp = date;
        let daysCount = Math.floor((this.timestamp.getTime() - EPOCH) / 86400000);
        // Look for a index based on number of days since epoch.
        // it is just to save some iterations searching from idx 0.
        // So dividing by a number slightly higher than number of days in a year (365.25)
        let idx = Math.floor(daysCount / 366);
        while (daysCount >= NEPALI_DATE_MAP[idx][SUM_IDX]) {
            idx += 1;
        }
        daysCount -= NEPALI_DATE_MAP[idx - 1][SUM_IDX];
        const tmp = NEPALI_DATE_MAP[idx];
        // eslint-disable-next-line prefer-destructuring
        this.year = tmp[0];
        // Month starts at 0, check for remaining days left
        this.month = 0;
        while (daysCount >= tmp[this.month + 1]) {
            this.month += 1;
            daysCount -= tmp[this.month];
        }
        // The day of month is the remaining days + 1
        this.day = daysCount + 1;
    }
    getEnglishDate() {
        return this.timestamp;
    }
    parse(dateString) {
        this.set.apply(this, parse(dateString));
    }
    getYear() {
        return this.year;
    }
    getMonth() {
        return this.month;
    }
    getDate() {
        return this.day;
    }
    getDay() {
        return this.timestamp.getDay();
    }
    getHours() {
        return this.timestamp.getHours();
    }
    getMinutes() {
        return this.timestamp.getMinutes();
    }
    getSeconds() {
        return this.timestamp.getSeconds();
    }
    getMilliseconds() {
        return this.timestamp.getMilliseconds();
    }
    getTime() {
        return this.timestamp.getTime();
    }
    setYear(year) {
        this.set(year, this.month, this.day);
    }
    setMonth(month) {
        this.set(this.year, month, this.day);
    }
    setDate(day) {
        this.set(this.year, this.month, day);
    }
    set(year, month, date) {
        const idx = year + Math.floor(month / 12) - START_YEAR;
        const tmp = NEPALI_DATE_MAP[idx];
        let d = tmp[SUM_IDX] - tmp[SUM_IDX - 1];
        const m = month % 12;
        const mm = m < 0 ? 12 + m : m;
        for (let i = 0; i < mm; i += 1) {
            d += tmp[i + 1];
        }
        d += date - 1;
        this.setEnglishDate(new Date(EPOCH + d * 86400000));
    }
    format(formatStr) {
        return format(this, formatStr);
    }
    toString() {
        return `${this.year}/${this.month + 1}/${this.day}`;
    }
}
NepaliDate.minimum = () => new Date(EPOCH);
NepaliDate.maximum = () => new Date(EPOCH + NEPALI_DATE_MAP[NEPALI_DATE_MAP.length - 1][SUM_IDX] * 86400000);

module.exports = NepaliDate;
//# sourceMappingURL=index.js.map
