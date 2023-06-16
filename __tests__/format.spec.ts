import format from '../src/format'
import NepaliDate from '../src/NepaliDate'

describe('format', () => {
    const nepaliDate1 = new NepaliDate(2080, 1, 32, 7, 40)
    const nepaliDate2 = new NepaliDate(2080, 1, 8, 7, 55)
    const nepaliDate3 = new NepaliDate(2080, 8, 15, 16, 9, 40)

    it('should format NepaliDate for the provided format string', () => {
        const formatStr = 'YYYY-MM-DD'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2080-02-32')
    })

    it('should handle a format string with repeated formats', () => {
        const formatStr = 'YYYY YYYY'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2080 2080')
    })

    //   it('should handle a format string with multiple formats', () => {
    //     const formatStr = 'YYYY-MM-DD HH:mm'
    //     const formattedDate = format(nepaliDate1, formatStr)
    //     expect(formattedDate).toEqual('2080-02-32 07:40')
    //   })

    //   it('should handle a format string with unknown tokens', () => {
    //     const formatStr = 'YYYY-QQ-DD HH:mm:ss'
    //     const formattedDate = format(nepaliDate1, formatStr)
    //     expect(formattedDate).toEqual('2080-QQ-32 07:40:00')
    //   })

    //   it('should handle a format string with escaped characters', () => {
    //     const formatStr = 'YYYY-MM-DD \\HH:mm'
    //     const formattedDate = format(nepaliDate1, formatStr)
    //     expect(formattedDate).toEqual('2080-02-32 07:40')
    //   })

    it('should format NepaliDate with the non leading zeros format', () => {
        const formatStr = 'YYYY-M-D'
        const formattedDate = format(nepaliDate2, formatStr)
        expect(formattedDate).toEqual('2080-2-8')
    })

    it('should not format NepaliDate for invalid format size', () => {
        const formatStr = 'YYYYY-MMMMM-DDD ddddd' // invalid format
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('YYYYY-MMMMM-DDD ddddd')
    })

    /* individual format tests (positive cases) */

    it('should format NepaliDate for YYYY: 4 digit year', () => {
        const formatStr = 'YYYY'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2080')
    })

    it('should format NepaliDate for Y: 4 digit year', () => {
        const formatStr = 'Y'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('2080')
    })

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
})
