import { parseEnglishDateFormat } from '../../src/parse'

describe('parseEnglishDateFormat', () => {
    it('should parse date string in valid format correctly', () => {
        expect(
            parseEnglishDateFormat('2024-08-02 12:34:56', 'YYYY-MM-DD HH:mm:ss')
        ).toEqual([2024, 7, 2, 12, 34, 56, 0])
    })

    it('should parse date string with milliseconds', () => {
        expect(
            parseEnglishDateFormat('2024-08-02 12:34:56.789', 'YYYY-MM-DD HH:mm:ss.SSS')
        ).toEqual([2024, 7, 2, 12, 34, 56, 789])
    })

    it('should parse date string with leading zeros in format', () => {
        expect(
            parseEnglishDateFormat('2024-08-02 09:05:07', 'YYYY-MM-DD HH:mm:ss')
        ).toEqual([2024, 7, 2, 9, 5, 7, 0])
    })

    it('should parse date string with 2digit year and single-digit month and day', () => {
        expect(parseEnglishDateFormat('24-8-2 12:34:56', 'YY-M-D HH:mm:ss')).toEqual([
            2024, 7, 2, 12, 34, 56, 0,
        ])
    })

    it('should parse date string with 12-hour format', () => {
        expect(
            parseEnglishDateFormat('2024-08-02 05:34:56 PM', 'YYYY-MM-DD hh:mm:ss A')
        ).toEqual([2024, 7, 2, 17, 34, 56, 0])
    })

    it("should parse date string with 12-hour format before 12 o'clock", () => {
        expect(
            parseEnglishDateFormat('2024-08-02 05:34:56 AM', 'YYYY-MM-DD hh:mm:ss A')
        ).toEqual([2024, 7, 2, 5, 34, 56, 0])
    })

    it('should parse date string with static text in format', () => {
        expect(
            parseEnglishDateFormat(
                'Year: 2024, Month: 08, Day: 02',
                '[Year]: YYYY, [Month]: MM, [Day]: DD'
            )
        ).toEqual([2024, 7, 2, 0, 0, 0, 0])
    })

    it('should throw error for invalid format, missing time components', () => {
        expect(() => {
            parseEnglishDateFormat('2024-08-02', 'YYYY-MM-DD HH:mm:ss')
        }).toThrowError(Error)
    })

    it('should throw error for invalid format, without static text', () => {
        expect(() => {
            parseEnglishDateFormat('2024-08-02 12:34:56 test', 'YYYY-MM-DD HH:mm:ss')
        }).toThrowError(Error)
    })

    it('should parse date string with full month text', () => {
        expect(parseEnglishDateFormat('2024, August 23', 'YYYY, MMMM DD')).toEqual([
            2024, 7, 23, 0, 0, 0, 0,
        ])
    })

    it('should parse date string with full month text with time', () => {
        expect(
            parseEnglishDateFormat(
                '2024, August 23, 10:16:30',
                'YYYY, MMMM DD, HH:mm:ss'
            )
        ).toEqual([2024, 7, 23, 10, 16, 30, 0])
    })

    it('should throw error with full month text and missing literals', () => {
        expect(() =>
            parseEnglishDateFormat('2024/August/23', 'YYYY/MMMM/DD HH:mm:ss')
        ).toThrowError(Error)
    })

    it('should parse date string with short month text', () => {
        expect(parseEnglishDateFormat('2024, Aug 23', 'YYYY, MMM DD')).toEqual([
            2024, 7, 23, 0, 0, 0, 0,
        ])
    })

    it('should parse date string with short month text with time', () => {
        expect(
            parseEnglishDateFormat('2024, Aug 23, 10:16:30', 'YYYY, MMM DD, HH:mm:ss')
        ).toEqual([2024, 7, 23, 10, 16, 30, 0])
    })

    it('should throw error with short month text and missing literals', () => {
        expect(() =>
            parseEnglishDateFormat('2024/Aug/23', 'YYYY/MMM/DD HH:mm:ss')
        ).toThrowError(Error)
    })

    it('should parse weekday fullname', () => {
        expect(parseEnglishDateFormat('Wednesday', 'dddd')).toEqual([
            0, 0, 1, 0, 0, 0, 0,
        ])
    })

    it('should parse weekday short name', () => {
        expect(parseEnglishDateFormat('Wed', 'ddd')).toEqual([0, 0, 1, 0, 0, 0, 0])
    })

    it('should parse weekday short 2 letter name', () => {
        expect(parseEnglishDateFormat('Wed', 'dd')).toEqual([0, 0, 1, 0, 0, 0, 0])
    })

    it('should parse weekday number', () => {
        expect(parseEnglishDateFormat('3', 'd')).toEqual([0, 0, 1, 0, 0, 0, 0])
    })

    it('should throw error on random weekday number', () => {
        expect(() => parseEnglishDateFormat('7', 'd')).toThrowError(Error)
    })

    it('should throw error on random weekday name', () => {
        expect(() => parseEnglishDateFormat('we', 'dd')).toThrowError(Error)
    })

    it('should parse nothing', () => {
        expect(parseEnglishDateFormat('Yellow', 'Yellow')).toEqual([
            0, 0, 1, 0, 0, 0, 0,
        ])
    })
})
