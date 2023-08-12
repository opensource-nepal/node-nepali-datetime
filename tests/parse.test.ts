import { parseFormat } from '../src/parse'

describe('parseFormat', () => {
    it('should parse date string in valid format correctly', () => {
        expect(parseFormat('2080-08-02 12:34:56', 'YYYY-MM-DD HH:mm:ss')).toEqual([
            2080, 7, 2, 12, 34, 56, 0,
        ])
    })

    it('should parse date string with milliseconds', () => {
        expect(
            parseFormat('2080-08-02 12:34:56.789', 'YYYY-MM-DD HH:mm:ss.SSS')
        ).toEqual([2080, 7, 2, 12, 34, 56, 789])
    })

    it('should parse date string with leading zeros in format', () => {
        expect(parseFormat('2080-08-02 09:05:07', 'YYYY-MM-DD HH:mm:ss')).toEqual([
            2080, 7, 2, 9, 5, 7, 0,
        ])
    })

    it('should parse date string with 2digit year and single-digit month and day', () => {
        expect(parseFormat('80-8-2 12:34:56', 'YY-M-D HH:mm:ss')).toEqual([
            2080, 7, 2, 12, 34, 56, 0,
        ])
    })

    it('should parse date string with 12-hour format', () => {
        expect(parseFormat('2080-08-02 05:34:56 PM', 'YYYY-MM-DD hh:mm:ss A')).toEqual([
            2080, 7, 2, 17, 34, 56, 0,
        ])
    })

    it("should parse date string with 12-hour format before 12 o'clock", () => {
        expect(parseFormat('2080-08-02 05:34:56 AM', 'YYYY-MM-DD hh:mm:ss A')).toEqual([
            2080, 7, 2, 5, 34, 56, 0,
        ])
    })

    it('should parse date string with static text in format', () => {
        expect(
            parseFormat(
                'Year: 2080, Month: 08, Day: 02',
                '[Year]: YYYY, [Month]: MM, [Day]: DD'
            )
        ).toEqual([2080, 7, 2, 0, 0, 0, 0])
    })

    it('should throw error for invalid format, missing time components', () => {
        expect(() => {
            parseFormat('2080-08-02', 'YYYY-MM-DD HH:mm:ss')
        }).toThrowError(Error)
    })

    it('should throw error for invalid format, without static text', () => {
        expect(() => {
            parseFormat('2080-08-02 12:34:56 test', 'YYYY-MM-DD HH:mm:ss')
        }).toThrowError(Error)
    })

    it('should parse date string with month in Devanagari format', () => {
        expect(parseFormat('2080, Shrawan 23', 'YYYY, MMMM DD')).toEqual([
            2080, 3, 23, 0, 0, 0, 0,
        ])
    })

    it('should parse date string with month in Devanagari format with time', () => {
        expect(
            parseFormat('2080, Shrawan 23, 10:16:30', 'YYYY, MMMM DD, HH:mm:ss')
        ).toEqual([2080, 3, 23, 10, 16, 30, 0])
    })

    it('should throw error with month in Devanagari format and missing literals', () => {
        expect(() =>
            parseFormat('2080/Shrawan/23', 'YYYY/MMMM/DD HH:mm:ss')
        ).toThrowError(Error)
    })

    it('should parse date string with month in short Devanagari format', () => {
        expect(parseFormat('2080, Shr 23', 'YYYY, MMM DD')).toEqual([
            2080, 3, 23, 0, 0, 0, 0,
        ])
    })

    it('should parse date string with month in short Devanagari format with time', () => {
        expect(parseFormat('2080, Shr 23, 10:16:30', 'YYYY, MMM DD, HH:mm:ss')).toEqual(
            [2080, 3, 23, 10, 16, 30, 0]
        )
    })

    it('should throw error with month in short Devanagari format and missing literals', () => {
        expect(() => parseFormat('2080/Shr/23', 'YYYY/MMM/DD HH:mm:ss')).toThrowError(
            Error
        )
    })

    it('should parse weekday fullname', () => {
        expect(parseFormat('Wednesday', 'dddd')).toEqual([0, 0, 1, 0, 0, 0, 0])
    })

    it('should parse weekday short name', () => {
        expect(parseFormat('Wed', 'ddd')).toEqual([0, 0, 1, 0, 0, 0, 0])
    })

    it('should parse weekday short 2 letter name', () => {
        expect(parseFormat('Wed', 'dd')).toEqual([0, 0, 1, 0, 0, 0, 0])
    })

    it('should parse weekday number', () => {
        expect(parseFormat('3', 'd')).toEqual([0, 0, 1, 0, 0, 0, 0])
    })

    it('should throw error on random weekday number', () => {
        expect(() => parseFormat('7', 'd')).toThrowError(Error)
    })

    it('should throw error on random weekday name', () => {
        expect(() => parseFormat('we', 'dd')).toThrowError(Error)
    })

    it('should parse nothing', () => {
        expect(parseFormat('Yellow', 'Yellow')).toEqual([0, 0, 1, 0, 0, 0, 0])
    })
})
