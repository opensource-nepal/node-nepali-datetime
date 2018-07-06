const MONTHS_EN = ['Baisakh', 'Jestha', 'Asar', 'Shrawan', 'Bhadra', 'Aswin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
const MONTHS_SHORT_EN = ['Bai', 'Jes', 'Asa', 'Shr', 'Bhd', 'Asw', 'Kar', 'Man', 'Pou', 'Mag', 'Fal', 'Cha'];
const MONTHS_NP = ['बैशाख', 'जेठ', 'असार', 'श्रावण', 'भाद्र', 'आश्विन', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुण', 'चैत्र'];
const MONTHS_SHORT_NP = ['बै', 'जे', 'अ', 'श्रा', 'भा', 'आ', 'का', 'मं', 'पौ', 'मा', 'फा', 'चै'];
const NUM_NP = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
const WEEKDAYS_SHORT_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAYS_LONG_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEKDAYS_SHORT_NP = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'];
const WEEKDAYS_LONG_NP = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'];

function pad(n) {
  if (n < 10) {
    return `0${n}`;
  }
  return `${n}`;
}

function npDigit(str) {
  let res = '';
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
  let seq = '';
  let special = '';
  let specialSize = 0;

  const tokens = [];

  for (let i = 0; i < formatStr.length; i += 1) {
    const ch = formatStr[i];
    if (ch === special) {
      specialSize += 1;
      // eslint-disable-next-line no-continue
      continue;
    }

    // Time to process special
    if (special !== '') {
      tokens.push(fn[special](specialSize));
      special = '';
      specialSize = 0;
    }

    if (ch === '"') {
      inQuote = !inQuote;
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!isSpecial(ch) || inQuote) {
      seq += ch;
    } else {
      // got a special character
      if (seq) {
        tokens.push(pass(seq));
        seq = '';
      }

      special = ch;
      specialSize = 1;
    }
  }

  if (seq) {
    tokens.push(pass(seq));
  } else if (special) {
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
export default function format(nepaliDate, formatStr) {
  return tokenize(formatStr).map(f => f(nepaliDate)).join('');
}
