import { formatEnglishDate, formatEnglishDateInNepali } from '../../src/format'
import NepaliDate from '../../src/NepaliDate'

describe('formatEnglishDate', () => {
    const nepaliDate1 = new NepaliDate(2080, 1, 32, 7, 40)
    const nepaliDate2 = new NepaliDate(2080, 1, 8, 20, 55, 32)
    const nepaliDate3 = new NepaliDate(2080, 8, 15, 16, 9, 40, 413)

    it('should format NepaliDate for the provided format string', () => {
        const formatStr = 'YYYY-MM-DD'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2023-06-15')
    })

    it('should format NepaliDate for the provided format string with normal text', () => {
        const formatStr = '[Hello] YYYY-MM-DD [World]!'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Hello 2023-06-15 World!')
    })

    it('should handle a format string with repeated formats', () => {
        const formatStr = 'YYYY YYYY'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2023 2023')
    })

    it('should handle a format string with multiple formats', () => {
        const formatStr = 'YYYY-MM-DD HH:mm'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2023-06-15 07:40')
    })

    it('should handle a format string with unknown formats', () => {
        const formatStr = 'YYYY-QQ-DD HH:mm:ss'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2023-QQ-15 07:40:00')
    })

    it('should format NepaliDate with the non leading zeros format', () => {
        const formatStr = 'YYYY-M-D'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2023-6-15')
    })

    it('should not format NepaliDate for extended format size', () => {
        const formatStr = 'YYYYY-MMMMM-DDD dddddd HHH hhh:mmm:sss:SSSS AA aa'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual(
            '2023Y-June6-1515 ThursdayThu 077 077:4040:000:000S AMAM amam'
        )
    })

    /* individual format tests (positive cases) */

    it('should format NepaliDate for YYYY: 4 digit year', () => {
        const formatStr = 'YYYY'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2023')
    })

    it('should format NepaliDate for YY: 2 digit year', () => {
        const formatStr = 'YY'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('23')
    })

    it('should format NepaliDate for MMMM: full month name', () => {
        const formatStr = 'MMMM'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('June')
    })

    it('should format NepaliDate for MMM: month abbr name', () => {
        const formatStr = 'MMM'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Jun')
    })

    it('should format NepaliDate for MM: month', () => {
        const formatStr = 'MM'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('06')
    })

    it('should format NepaliDate for M: month with non leading zero', () => {
        const formatStr = 'M'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('6')
    })

    it('should format NepaliDate for DD: day', () => {
        const formatStr = 'DD'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('15')
    })

    it('should format NepaliDate for D: day', () => {
        const formatStr = 'D'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('15')
    })

    it('should format NepaliDate for dddd: week day name', () => {
        const formatStr = 'dddd'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Thursday')
    })

    it('should format NepaliDate for ddd: week day abbr name', () => {
        const formatStr = 'ddd'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Thu')
    })

    it('should format NepaliDate for dd: week day abbr name', () => {
        const formatStr = 'dd'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Thu')
    })

    it('should format NepaliDate for d: week day number', () => {
        const formatStr = 'd'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('4')
    })

    it('should format NepaliDate for HH: 24-hour', () => {
        const formatStr = 'HH'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('07')
    })

    it('should format NepaliDate for H: 24-hour', () => {
        const formatStr = 'H'
        const formattedDate = formatEnglishDate(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('16')
    })

    it('should format NepaliDate for hh: 12-hour', () => {
        const formatStr = 'hh'
        const formattedDate = formatEnglishDate(nepaliDate2, formatStr)
        expect(formattedDate).toEqual('08')
    })

    it("should format NepaliDate for hh: 12-hour after 12 o'clock", () => {
        const formatStr = 'hh'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('07')
    })

    it('should format NepaliDate for h: 12-hour', () => {
        const formatStr = 'h'
        const formattedDate = formatEnglishDate(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('4')
    })

    it('should format NepaliDate for mm: minute', () => {
        const formatStr = 'mm'
        const formattedDate = formatEnglishDate(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('09')
    })

    it('should format NepaliDate for m: minute', () => {
        const formatStr = 'm'
        const formattedDate = formatEnglishDate(nepaliDate2, formatStr)
        expect(formattedDate).toEqual('55')
    })

    it('should format NepaliDate for ss: second', () => {
        const formatStr = 'ss'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('00')
    })

    it('should format NepaliDate for s: second', () => {
        const formatStr = 's'
        const formattedDate = formatEnglishDate(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('40')
    })

    it('should format NepaliDate for SSS: millisecond', () => {
        const formatStr = 'SSS'
        const formattedDate = formatEnglishDate(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('413')
    })

    it('should format NepaliDate of 1digit ms for SSS: millisecond', () => {
        const formatStr = 'SSS'
        const d = new NepaliDate(2080, 2, 26, 1, 2, 3, 4)
        const formattedDate = formatEnglishDate(d, formatStr)
        expect(formattedDate).toEqual('004')
    })

    it('should format NepaliDate of 2digit ms for SSS: millisecond', () => {
        const formatStr = 'SSS'
        const d = new NepaliDate(2080, 2, 26, 1, 2, 3, 41)
        const formattedDate = formatEnglishDate(d, formatStr)
        expect(formattedDate).toEqual('041')
    })

    it('should format NepaliDate (AM) for A: Uppercase AM/PM indicator (e.g., AM, PM)', () => {
        const formatStr = 'A'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('AM')
    })

    it('should format NepaliDate (PM) for A: Uppercase AM/PM indicator (e.g., AM, PM)', () => {
        const formatStr = 'A'
        const formattedDate = formatEnglishDate(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('PM')
    })

    it('should format NepaliDate (AM) for a: Lowercase AM/PM indicator (e.g., am, pm)', () => {
        const formatStr = 'a'
        const formattedDate = formatEnglishDate(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('am')
    })

    it('should format NepaliDate (PM) for a: Lowercase AM/PM indicator (e.g., am, pm)', () => {
        const formatStr = 'a'
        const formattedDate = formatEnglishDate(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('pm')
    })

    it('should format NepaliDate (AM) for midnight', () => {
        const nepaliDate = new NepaliDate(2079, 5, 3)
        const formatStr = 'A'
        const formattedDate = formatEnglishDate(nepaliDate, formatStr)
        expect(formattedDate).toEqual('AM')
    })

    it('should format NepaliDate (PM) for noon', () => {
        const nepaliDate = new NepaliDate(2079, 5, 3, 12)
        const formatStr = 'A'
        const formattedDate = formatEnglishDate(nepaliDate, formatStr)
        expect(formattedDate).toEqual('PM')
    })
})

describe('formatEnglishDateInNepali', () => {
    const nepaliDate1 = new NepaliDate(2080, 1, 32, 7, 40)
    const nepaliDate2 = new NepaliDate(2080, 1, 8, 20, 55, 32)
    const nepaliDate3 = new NepaliDate(2080, 8, 15, 16, 9, 40, 413)

    it('should format NepaliDate for the provided format string', () => {
        const formatStr = 'YYYY-MM-DD'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('२०२३-०६-१५')
    })

    it('should format NepaliDate for the provided format string with normal text', () => {
        const formatStr = '[Hello] YYYY-MM-DD [World]!'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Hello २०२३-०६-१५ World!')
    })

    it('should handle a format string with repeated formats', () => {
        const formatStr = 'YYYY YYYY'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('२०२३ २०२३')
    })

    it('should handle a format string with multiple formats', () => {
        const formatStr = 'YYYY-MM-DD HH:mm'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('२०२३-०६-१५ ०७:४०')
    })

    it('should handle a format string with unknown formats', () => {
        const formatStr = 'YYYY-QQ-DD HH:mm:ss'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('२०२३-QQ-१५ ०७:४०:००')
    })

    it('should format NepaliDate with the non leading zeros format', () => {
        const formatStr = 'YYYY-M-D'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('२०२३-६-१५')
    })

    it('should not format NepaliDate for extended format size', () => {
        const formatStr = 'YYYYY-MMMMM-DDD dddddd HHH hhh:mmm:sss:SSSS A a'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual(
            '२०२३Y-जुन६-१५१५ बिहिबारबिहि ०७७ ०७७:४०४०:०००:०००S एम एम'
        )
    })

    /* individual format tests (positive cases) */

    it('should format NepaliDate for YYYY: 4 digit year', () => {
        const formatStr = 'YYYY'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('२०२३')
    })

    it('should format NepaliDate for YY: 2 digit year', () => {
        const formatStr = 'YY'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('२३')
    })

    it('should format NepaliDate for MMMM: full month name', () => {
        const formatStr = 'MMMM'
        const formattedDate = formatEnglishDateInNepali(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('डिसेम्बर')
    })

    it('should format NepaliDate for MMM: month abbr name', () => {
        const formatStr = 'MMM'
        const formattedDate = formatEnglishDateInNepali(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('डिसे')
    })

    it('should format NepaliDate for MM: month', () => {
        const formatStr = 'MM'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('०६')
    })

    it('should format NepaliDate for M: month with non leading zero', () => {
        const formatStr = 'M'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('६')
    })

    it('should format NepaliDate for DD: day', () => {
        const formatStr = 'DD'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('१५')
    })

    it('should format NepaliDate for D: day', () => {
        const formatStr = 'D'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('१५')
    })

    it('should format NepaliDate for dddd: week day name', () => {
        const formatStr = 'dddd'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('बिहिबार')
    })

    it('should format NepaliDate for ddd: week day abbr name', () => {
        const formatStr = 'ddd'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('बिहि')
    })

    it('should format NepaliDate for dd: week day abbr name', () => {
        const formatStr = 'dd'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('बिहि')
    })

    it('should format NepaliDate for d: week day number', () => {
        const formatStr = 'd'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('४')
    })

    it('should format NepaliDate for HH: 24-hour', () => {
        const formatStr = 'HH'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('०७')
    })

    it('should format NepaliDate for H:  24-hour', () => {
        const formatStr = 'H'
        const formattedDate = formatEnglishDateInNepali(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('१६')
    })

    it('should format NepaliDate for hh: 12-hour', () => {
        const formatStr = 'hh'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('०७')
    })

    it('should format NepaliDate for hh: 12-hour', () => {
        const formatStr = 'hh'
        const formattedDate = formatEnglishDateInNepali(nepaliDate2, formatStr)
        expect(formattedDate).toEqual('०८')
    })

    it('should format NepaliDate for h: 12-hour', () => {
        const formatStr = 'h'
        const formattedDate = formatEnglishDateInNepali(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('४')
    })

    it('should format NepaliDate for mm: minute', () => {
        const formatStr = 'mm'
        const formattedDate = formatEnglishDateInNepali(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('०९')
    })

    it('should format NepaliDate for m: minute', () => {
        const formatStr = 'm'
        const formattedDate = formatEnglishDateInNepali(nepaliDate2, formatStr)
        expect(formattedDate).toEqual('५५')
    })

    it('should format NepaliDate for ss: second', () => {
        const formatStr = 'ss'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('००')
    })

    it('should format NepaliDate for s: second', () => {
        const formatStr = 's'
        const formattedDate = formatEnglishDateInNepali(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('४०')
    })

    it('should format NepaliDate for SSS: millisecond', () => {
        const formatStr = 'SSS'
        const formattedDate = formatEnglishDateInNepali(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('४१३')
    })

    it('should format NepaliDate of 1digit ms for SSS: millisecond', () => {
        const formatStr = 'SSS'
        const d = new NepaliDate(2080, 2, 26, 1, 2, 3, 4)
        const formattedDate = formatEnglishDateInNepali(d, formatStr)
        expect(formattedDate).toEqual('००४')
    })

    it('should format NepaliDate of 2digit ms for SSS: millisecond', () => {
        const formatStr = 'SSS'
        const d = new NepaliDate(2080, 2, 26, 1, 2, 3, 41)
        const formattedDate = formatEnglishDateInNepali(d, formatStr)
        expect(formattedDate).toEqual('०४१')
    })

    it('should format NepaliDate (AM) for A', () => {
        const formatStr = 'A'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('एम')
    })

    it('should format NepaliDate (PM) for A', () => {
        const formatStr = 'A'
        const formattedDate = formatEnglishDateInNepali(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('पिम')
    })

    it('should format NepaliDate (AM) for a', () => {
        const formatStr = 'a'
        const formattedDate = formatEnglishDateInNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('एम')
    })

    it('should format NepaliDate (PM) for a', () => {
        const formatStr = 'a'
        const formattedDate = formatEnglishDateInNepali(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('पिम')
    })
})
