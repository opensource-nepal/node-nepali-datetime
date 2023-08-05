import { format, formatNepali, nepaliDateToString } from '../src/format_v2'
import NepaliDate from '../src/NepaliDate'

describe('format', () => {
    const nepaliDate1 = new NepaliDate(2080, 1, 32, 7, 40)
    const nepaliDate2 = new NepaliDate(2080, 1, 8, 20, 55, 32)
    const nepaliDate3 = new NepaliDate(2080, 8, 15, 16, 9, 40, 413)

    it('should format NepaliDate for the provided format string', () => {
        const formatStr = 'YYYY-MM-DD'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2080-02-32')
    })

    it('should format NepaliDate for the provided format string with normal text', () => {
        const formatStr = '[Hello] YYYY-MM-DD [World]!'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Hello 2080-02-32 World!')
    })

    it('should handle a format string with repeated formats', () => {
        const formatStr = 'YYYY YYYY'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2080 2080')
    })

    it('should handle a format string with multiple formats', () => {
        const formatStr = 'YYYY-MM-DD HH:mm'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2080-02-32 07:40')
    })

    it('should handle a format string with unknown formats', () => {
        const formatStr = 'YYYY-QQ-DD HH:mm:ss'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2080-QQ-32 07:40:00')
    })

    it('should format NepaliDate with the non leading zeros format', () => {
        const formatStr = 'YYYY-M-D'
        const formattedDate = format(nepaliDate2, formatStr)
        expect(formattedDate).toEqual('2080-2-8')
    })

    it('should not format NepaliDate for extended format size', () => {
        const formatStr = 'YYYYY-MMMMM-DDD dddddd HHH hhh:mmm:sss:SSSS AA aa'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual(
            '2080Y-Jestha2-3232 ThursdayThu 077 077:4040:000:000S AMAM amam'
        )
    })

    /* individual format tests (positive cases) */

    it('should format NepaliDate for YYYY: 4 digit year', () => {
        const formatStr = 'YYYY'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2080')
    })

    it('should format NepaliDate for YY: 2 digit year', () => {
        const formatStr = 'YY'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('80')
    })

    it('should format NepaliDate for MMMM: full month name', () => {
        const formatStr = 'MMMM'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Jestha')
    })

    it('should format NepaliDate for MMM: month abbr name', () => {
        const formatStr = 'MMM'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Jes')
    })

    it('should format NepaliDate for MM: month', () => {
        const formatStr = 'MM'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('02')
    })

    it('should format NepaliDate for M: month with non leading zero', () => {
        const formatStr = 'M'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2')
    })

    it('should format NepaliDate for DD: day', () => {
        const formatStr = 'DD'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('32')
    })

    it('should format NepaliDate for D: day', () => {
        const formatStr = 'D'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('32')
    })

    it('should format NepaliDate for dddd: week day name', () => {
        const formatStr = 'dddd'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Thursday')
    })

    it('should format NepaliDate for ddd: week day abbr name', () => {
        const formatStr = 'ddd'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Thu')
    })

    it('should format NepaliDate for dd: week day abbr name', () => {
        const formatStr = 'dd'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Thu')
    })

    it('should format NepaliDate for d: week day number', () => {
        const formatStr = 'd'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('4')
    })

    it('should format NepaliDate for HH: 24-hour', () => {
        const formatStr = 'HH'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('07')
    })

    it('should format NepaliDate for H:  24-hour', () => {
        const formatStr = 'H'
        const formattedDate = format(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('16')
    })

    it('should format NepaliDate for hh: 12-hour', () => {
        const formatStr = 'hh'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('07')
    })

    it('should format NepaliDate for h: 12-hour', () => {
        const formatStr = 'h'
        const formattedDate = format(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('4')
    })

    it('should format NepaliDate for mm: minute', () => {
        const formatStr = 'mm'
        const formattedDate = format(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('09')
    })

    it('should format NepaliDate for m: minute', () => {
        const formatStr = 'm'
        const formattedDate = format(nepaliDate2, formatStr)
        expect(formattedDate).toEqual('55')
    })

    it('should format NepaliDate for ss: second', () => {
        const formatStr = 'ss'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('00')
    })

    it('should format NepaliDate for s: second', () => {
        const formatStr = 's'
        const formattedDate = format(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('40')
    })

    it('should format NepaliDate for SSS: millisecond', () => {
        const formatStr = 'SSS'
        const formattedDate = format(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('413')
    })

    it('should format NepaliDate of 1digit ms for SSS: millisecond', () => {
        const formatStr = 'SSS'
        const d = new NepaliDate(2080, 2, 26, 1, 2, 3, 4)
        const formattedDate = format(d, formatStr)
        expect(formattedDate).toEqual('004')
    })

    it('should format NepaliDate of 2digit ms for SSS: millisecond', () => {
        const formatStr = 'SSS'
        const d = new NepaliDate(2080, 2, 26, 1, 2, 3, 41)
        const formattedDate = format(d, formatStr)
        expect(formattedDate).toEqual('041')
    })

    it('should format NepaliDate (AM) for A: Uppercase AM/PM indicator (e.g., AM, PM)', () => {
        const formatStr = 'A'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('AM')
    })

    it('should format NepaliDate (PM) for A: Uppercase AM/PM indicator (e.g., AM, PM)', () => {
        const formatStr = 'A'
        const formattedDate = format(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('PM')
    })

    it('should format NepaliDate (AM) for a: Lowercase AM/PM indicator (e.g., am, pm)', () => {
        const formatStr = 'a'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('am')
    })

    it('should format NepaliDate (PM) for a: Lowercase AM/PM indicator (e.g., am, pm)', () => {
        const formatStr = 'a'
        const formattedDate = format(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('pm')
    })
})

describe('formatNepali', () => {
    const nepaliDate1 = new NepaliDate(2080, 1, 32, 7, 40)
    const nepaliDate2 = new NepaliDate(2080, 1, 8, 20, 55, 32)
    const nepaliDate3 = new NepaliDate(2080, 8, 15, 16, 9, 40, 413)

    it('should format NepaliDate for the provided format string', () => {
        const formatStr = 'YYYY-MM-DD'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('२०८०-०२-३२')
    })

    it('should format NepaliDate for the provided format string with normal text', () => {
        const formatStr = '[Hello] YYYY-MM-DD [World!]'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Hello २०८०-०२-३२ World!')
    })

    it('should handle a format string with repeated formats', () => {
        const formatStr = 'YYYY YYYY'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('२०८० २०८०')
    })

    it('should handle a format string with multiple formats', () => {
        const formatStr = 'YYYY-MM-DD HH:mm'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('२०८०-०२-३२ ०७:४०')
    })

    it('should handle a format string with unknown formats', () => {
        const formatStr = 'YYYY-QQ-DD HH:mm:ss'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('२०८०-QQ-३२ ०७:४०:००')
    })

    it('should format NepaliDate with the non leading zeros format', () => {
        const formatStr = 'YYYY-M-D'
        const formattedDate = formatNepali(nepaliDate2, formatStr)
        expect(formattedDate).toEqual('२०८०-२-८')
    })

    it('should not format NepaliDate for extended format size', () => {
        const formatStr = 'YYYYY-MMMMM-DDD dddddd HHH hhh:mmm:sss:SSSS A a'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual(
            '२०८०Y-जेठ२-३२३२ बिहिबारबिहि ०७७ ०७७:४०४०:०००:०००S A a'
        )
    })

    /* individual format tests (positive cases) */

    it('should format NepaliDate for YYYY: 4 digit year', () => {
        const formatStr = 'YYYY'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('२०८०')
    })

    it('should format NepaliDate for YY: 2 digit year', () => {
        const formatStr = 'YY'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('८०')
    })

    it('should format NepaliDate for MMMM: full month name', () => {
        const formatStr = 'MMMM'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('जेठ')
    })

    it('should format NepaliDate for MMM: month abbr name', () => {
        const formatStr = 'MMM'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('जे')
    })

    it('should format NepaliDate for MM: month', () => {
        const formatStr = 'MM'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('०२')
    })

    it('should format NepaliDate for M: month with non leading zero', () => {
        const formatStr = 'M'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('२')
    })

    it('should format NepaliDate for DD: day', () => {
        const formatStr = 'DD'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('३२')
    })

    it('should format NepaliDate for D: day', () => {
        const formatStr = 'D'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('३२')
    })

    it('should format NepaliDate for dddd: week day name', () => {
        const formatStr = 'dddd'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('बिहिबार')
    })

    it('should format NepaliDate for ddd: week day abbr name', () => {
        const formatStr = 'ddd'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('बिहि')
    })

    it('should format NepaliDate for dd: week day abbr name', () => {
        const formatStr = 'dd'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('बिहि')
    })

    it('should format NepaliDate for d: week day number', () => {
        const formatStr = 'd'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('४')
    })

    it('should format NepaliDate for HH: 24-hour', () => {
        const formatStr = 'HH'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('०७')
    })

    it('should format NepaliDate for H:  24-hour', () => {
        const formatStr = 'H'
        const formattedDate = formatNepali(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('१६')
    })

    it('should format NepaliDate for hh: 12-hour', () => {
        const formatStr = 'hh'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('०७')
    })

    it('should format NepaliDate for h: 12-hour', () => {
        const formatStr = 'h'
        const formattedDate = formatNepali(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('४')
    })

    it('should format NepaliDate for mm: minute', () => {
        const formatStr = 'mm'
        const formattedDate = formatNepali(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('०९')
    })

    it('should format NepaliDate for m: minute', () => {
        const formatStr = 'm'
        const formattedDate = formatNepali(nepaliDate2, formatStr)
        expect(formattedDate).toEqual('५५')
    })

    it('should format NepaliDate for ss: second', () => {
        const formatStr = 'ss'
        const formattedDate = formatNepali(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('००')
    })

    it('should format NepaliDate for s: second', () => {
        const formatStr = 's'
        const formattedDate = formatNepali(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('४०')
    })

    it('should format NepaliDate for SSS: millisecond', () => {
        const formatStr = 'SSS'
        const formattedDate = formatNepali(nepaliDate3, formatStr)
        expect(formattedDate).toEqual('४१३')
    })

    it('should format NepaliDate of 1digit ms for SSS: millisecond', () => {
        const formatStr = 'SSS'
        const d = new NepaliDate(2080, 2, 26, 1, 2, 3, 4)
        const formattedDate = formatNepali(d, formatStr)
        expect(formattedDate).toEqual('००४')
    })

    it('should format NepaliDate of 2digit ms for SSS: millisecond', () => {
        const formatStr = 'SSS'
        const d = new NepaliDate(2080, 2, 26, 1, 2, 3, 41)
        const formattedDate = formatNepali(d, formatStr)
        expect(formattedDate).toEqual('०४१')
    })
})

describe('nepaliDateToString', () => {
    it('should format NepaliDate in YYYY-MM-DD HH:mm:ss format', () => {
        const nepaliDate = new NepaliDate(2080, 2, 26, 21, 2, 23)
        const toString = nepaliDateToString(nepaliDate)
        expect(toString).toBe('2080-03-26 21:02:23')
    })

    it('should format NepaliDate in YYYY-MM-DD HH:mm:ss.SSS format', () => {
        const nepaliDate = new NepaliDate(2080, 2, 26, 21, 2, 23, 689)
        const toString = nepaliDateToString(nepaliDate)
        expect(toString).toBe('2080-03-26 21:02:23.689')
    })
})
