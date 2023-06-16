import format from '../src/format'
import NepaliDate from '../src/NepaliDate'

describe('format', () => {
    const nepaliDate1 = new NepaliDate(2080, 1, 32, 7, 40)
    const nepaliDate2 = new NepaliDate(2080, 1, 8, 7, 55)
    const nepaliDate3 = new NepaliDate(2080, 8, 15, 16, 9, 40)

    it('should format the NepaliDate for the provided format string', () => {
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

    it('should format the NepaliDate with the non leading zeros format', () => {
        const formatStr = 'YYYY-M-D'
        const formattedDate = format(nepaliDate2, formatStr)
        expect(formattedDate).toEqual('2080-2-8')
    })

    it('should format the NepaliDate for 2 digit year format', () => {
        const formatStr = 'YY'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('80')
    })

    it('should format the NepaliDate for full month name', () => {
        const formatStr = 'MMMM'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Jestha')
    })

    it('should format the NepaliDate for month abbr name', () => {
        const formatStr = 'MMM'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Jes')
    })
    
    it('should format the NepaliDate for week day name', () => {
        const formatStr = 'dddd'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Thursday')
    })

    it('should format the NepaliDate for week day abbr name', () => {
        const formatStr = 'ddd'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Thu')
    })

    it('should format the NepaliDate for week day abbr name 2', () => {
        const formatStr = 'dd'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('Thu')
    })

    it('should format the NepaliDate for week day number', () => {
        const formatStr = 'd'
        const formattedDate = format(nepaliDate1, formatStr)
        expect(formattedDate).toEqual('4')
    })
})
