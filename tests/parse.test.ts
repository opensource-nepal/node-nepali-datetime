import { parseFormat } from '../src/parse'

describe('parseFormat', () => {
    it('should parse date string in valid format correctly', () => {
        expect(parseFormat('2023-08-02 12:34:56', 'YYYY-MM-DD HH:mm:ss')).toEqual([
            2023, 7, 2, 12, 34, 56, 0,
        ])
    })

    it('should parse date string with milliseconds', () => {
        expect(
            parseFormat('2023-08-02 12:34:56.789', 'YYYY-MM-DD HH:mm:ss.SSS')
        ).toEqual([2023, 7, 2, 12, 34, 56, 789])
    })

    it('should parse date string with leading zeros in format', () => {
        expect(parseFormat('2023-08-02 09:05:07', 'YYYY-MM-DD HH:mm:ss')).toEqual([
            2023, 7, 2, 9, 5, 7, 0,
        ])
    })

    it('should parse date string with single-digit month and day', () => {
        expect(parseFormat('2023-8-2 12:34:56', 'YYYY-M-D HH:mm:ss')).toEqual([
            2023, 7, 2, 12, 34, 56, 0,
        ])
    })

    it('should parse date string with 12-hour format', () => {
        expect(parseFormat('2023-08-02 05:34:56 PM', 'YYYY-MM-DD hh:mm:ss A')).toEqual([
            2023, 7, 2, 17, 34, 56, 0,
        ])
    })

    it('should parse date string with static text in format', () => {
        expect(
            parseFormat(
                'Year: 2023, Month: 08, Day: 02',
                '[Year]: YYYY, [Month]: MM, [Day]: DD'
            )
        ).toEqual([2023, 7, 2, 0, 0, 0, 0])
    })

    it('should throw error for invalid format, missing time components', () => {
        expect(() => {
            parseFormat('2023-08-02', 'YYYY-MM-DD HH:mm:ss')
        }).toThrowError(Error)
    })

    it('should throw error for invalid format, without static text', () => {
        expect(() => {
            parseFormat('2023-08-02 12:34:56 test', 'YYYY-MM-DD HH:mm:ss')
        }).toThrowError(Error)
    })
})
