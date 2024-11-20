export const LOCALE_EN = 'en'
export const LOCALE_NE = 'ne'

export const UTC_OFFSET_IN_MS = 20700000 // 5 hours 45 minutes in ms

// timezone reference for +5:30
export const OLD_UTC_OFFSET_IN_MS = 19800000 // 5 hours 40 minutes in ms

// 504901800000: Wed Jan 01 1986 00:15:00 GMT+0545 (Nepal Time)
// is the timezone transition date on JavaScript
export const TIMEZONE_TRANSITION_TIMESTAMP = 504901800000
export const TIMEZONE_TRANSITION_DATE_REFERENCE = new Date(1986, 0, 1, 0, 15)

export const NEPALI_MONTHS_EN = [
    'Baisakh',
    'Jestha',
    'Asar',
    'Shrawan',
    'Bhadra',
    'Aswin',
    'Kartik',
    'Mangsir',
    'Poush',
    'Magh',
    'Falgun',
    'Chaitra',
]

export const NEPALI_MONTHS_SHORT_EN = [
    'Bai',
    'Jes',
    'Asa',
    'Shr',
    'Bhd',
    'Asw',
    'Kar',
    'Man',
    'Pou',
    'Mag',
    'Fal',
    'Cha',
]

export const NEPALI_MONTHS_NE = [
    'बैशाख',
    'जेठ',
    'असार',
    'श्रावण',
    'भाद्र',
    'आश्विन',
    'कार्तिक',
    'मंसिर',
    'पौष',
    'माघ',
    'फाल्गुण',
    'चैत्र',
]

export const NEPALI_MONTHS_SHORT_NE = [
    'बै',
    'जे',
    'अ',
    'श्रा',
    'भा',
    'आ',
    'का',
    'मं',
    'पौ',
    'मा',
    'फा',
    'चै',
]

export const ENGLISH_MONTHS_EN = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export const ENGLISH_MONTHS_SHORT_EN = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

export const ENGLISH_MONTHS_NE = [
    'जनवरी',
    'फेब्रुअरी',
    'मार्च',
    'अप्रिल',
    'मे',
    'जुन',
    'जुलाई',
    'अगस्ट',
    'सेप्टेम्बर',
    'अक्टोबर',
    'नोभेम्बर',
    'डिसेम्बर',
]

export const ENGLISH_MONTHS_SHORT_NE = [
    'जन',
    'फेब',
    'मार',
    'अप्रि',
    'मे',
    'जुन',
    'जुला',
    'अग',
    'सेप',
    'अक्टो',
    'नोभे',
    'डिसे',
]

export const NUM_NE = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']

export const WEEKDAYS_SHORT_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const WEEKDAYS_LONG_EN = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

export const WEEKDAYS_SHORT_NE = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि']

export const WEEKDAYS_LONG_NE = [
    'आइतबार',
    'सोमबार',
    'मंगलबार',
    'बुधबार',
    'बिहिबार',
    'शुक्रबार',
    'शनिबार',
]

// Formatting
export const FORMAT_TOKEN_REGEX =
    /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DD?|ddd?d?|do?|YYYY|YY|y{2,4}|yo?|a|A|hh?|HH?|mm?|ss?|SSS|x|X|.)/g
