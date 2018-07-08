import { START_YEAR, NEPALI_DATE_MAP, EPOCH } from './config';
import format from './format';

const SUM_IDX = 14;

function parse(dateString) {
  // Expected date formats are yyyy-mm-dd, yyyy.mm.dd yyyy/mm/dd
  const parts = dateString.split(/[-./]/, 3);
  const [year, month = 1, day = 1] = parts.map((d) => {
    const n = parseInt(d, 10);
    if (Number.isNaN(n)) {
      throw new Error('Invalid date');
    }
    return n;
  });

  // Make sure we are within range
  if (year < START_YEAR || year >= START_YEAR + NEPALI_DATE_MAP.length) {
    throw new Error('Nepal year out of range');
  }

  if (month < 1 || month > 12) {
    throw new Error('Invalid nepali month must be between 1 - 12');
  }

  const daysInMonth = NEPALI_DATE_MAP[year - START_YEAR][month];
  if (day < 1 || day > daysInMonth) {
    throw new Error(`Invalid nepali date must be between 1 - ${daysInMonth} in ${year} ${month}`);
  }

  return [year, month - 1, day];
}

class NepaliDate {
  constructor(...args) {
    if (args.length === 0) {
      this.setEnglishDate(new Date());
    } else if (args.length === 1) {
      const e = args[0];
      if (typeof e === 'object') {
        if (e instanceof Date) {
          this.setEnglishDate(e);
        } else if (e instanceof NepaliDate) {
          this.timestamp = e.timestamp;
          this.year = e.year;
          this.month = e.month;
          this.day = e.day;
        } else if (typeof e === 'number') {
          this.setEnglishDate(new Date(e));
        } else {
          throw new Error('Invalid date argument');
        }
      } else if (typeof e === 'string') {
        // Try to parse the date
        this.set(...parse(e));
      } else {
        throw new Error('Invalid date argument');
      }
    } else if (args.length === 3) {
      this.set(args[0], args[1], args[2]);
    } else {
      throw new Error('Invalid argument syntax');
    }
  }

  setEnglishDate(date) {
    this.timestamp = date;
    let daysCount = Math.floor((this.timestamp - EPOCH) / 86400000);
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
    this.set(...parse(dateString));
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
    const idx = (year + Math.floor(month / 12)) - START_YEAR;
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
NepaliDate.maximum = () => new Date(EPOCH
  + ((NEPALI_DATE_MAP[NEPALI_DATE_MAP.length - 1][SUM_IDX]) * 86400000));

export default NepaliDate;
