import NepalTimezoneDate from '../src/NepalTimezoneDate'

describe('NepalTimezoneDate', () => {
    it('should initialize from a unix epoch number (milliseconds)', () => {
        const timestamp = 1756819453
        const npTz = new NepalTimezoneDate(timestamp)
        expect(npTz).toBeInstanceOf(NepalTimezoneDate)
        expect(npTz.getTime()).toBe(timestamp)
    })

    it('should initialize from a Date object', () => {
        const dateObj = new Date()
        const npTz = new NepalTimezoneDate(dateObj)
        expect(npTz).toBeInstanceOf(NepalTimezoneDate)
        expect(npTz.getTime()).toBe(dateObj.getTime())
    })

    it('should initialize with no arguments as current Nepal time', () => {
        const npTz = new NepalTimezoneDate()
        expect(npTz).toBeInstanceOf(NepalTimezoneDate)
        expect(typeof npTz.getYear()).toBe('number')
        expect(typeof npTz.getMonth()).toBe('number')
        expect(typeof npTz.getDate()).toBe('number')
        expect(typeof npTz.getHours()).toBe('number')
        expect(typeof npTz.getMinutes()).toBe('number')
    })

    it('should initialize from a unix timestamp', () => {
        const timestamp = 1686501122598 // Sun Jun 11 2023 22:17:02 GMT+0545 (Nepal Time)
        const npTz = new NepalTimezoneDate(timestamp)
        expect(npTz.getTime()).toBe(timestamp)
        expect(npTz.getHours()).toBe(22)
        expect(npTz.getMinutes()).toBe(17)
    })

    it('should initialize from a Date object', () => {
        const d = new Date('2023-06-11T16:32:02.598Z')
        const npTz = new NepalTimezoneDate(d)
        expect(npTz.getYear()).toBe(2023)
        expect(npTz.getMonth()).toBe(5)
        expect(npTz.getDate()).toBe(11)
    })

    it('should initialize correctly with only year, month, and date', () => {
        // 2024, 1, 12 => February 12, 2024
        const npTz = new NepalTimezoneDate(2024, 1, 12)
        expect(npTz.getYear()).toBe(2024)
        expect(npTz.getMonth()).toBe(1)
        expect(npTz.getDate()).toBe(12)
        expect(npTz.getHours()).toBe(0)
        expect(npTz.getMinutes()).toBe(0)
        expect(npTz.getSeconds()).toBe(0)
        expect(npTz.getMilliseconds()).toBe(0)
        expect(npTz.toString()).toBe('2024-02-12 00:00:00 GMT+0545')
    })

    it('should initialize from Nepal time components', () => {
        const npTz = new NepalTimezoneDate(2025, 8, 2, 13, 53)
        expect(npTz.getYear()).toBe(2025)
        expect(npTz.getMonth()).toBe(8)
        expect(npTz.getDate()).toBe(2)
        expect(npTz.getHours()).toBe(13)
        expect(npTz.getMinutes()).toBe(53)
        // UTC time should be 8:08 AM
        expect(npTz.toDate().getUTCHours()).toBe(8)
        expect(npTz.toDate().getUTCMinutes()).toBe(8)
    })

    it('should initialize correctly with year, month, date, hour, minute, second, ms', () => {
        // 2024, 1, 12, 10, 30, 0, 0 => February 12, 2024, 10:30:00.000 (Nepal time)
        const npTz = new NepalTimezoneDate(2024, 1, 12, 10, 30, 0, 0)
        expect(npTz.getYear()).toBe(2024)
        expect(npTz.getMonth()).toBe(1)
        expect(npTz.getDate()).toBe(12)
        expect(npTz.getHours()).toBe(10)
        expect(npTz.getMinutes()).toBe(30)
        expect(npTz.getSeconds()).toBe(0)
        expect(npTz.getMilliseconds()).toBe(0)
        expect(npTz.toString()).toBe('2024-02-12 10:30:00 GMT+0545')
        // UTC time should be 4:45 AM
        expect(npTz.toDate().getUTCHours()).toBe(4)
        expect(npTz.toDate().getUTCMinutes()).toBe(45)
    })

    it('should return correct string representation', () => {
        const npTz = new NepalTimezoneDate(2024, 11, 28, 20, 45, 35)
        expect(npTz.toString()).toBe('2024-12-28 20:45:35 GMT+0545')
    })

    it('should throw error for invalid arguments', () => {
        expect(() => new NepalTimezoneDate('invalid' as any)).toThrow(
            'Invalid arguments for NepalTimezoneDate'
        )
        expect(() => new NepalTimezoneDate({} as any)).toThrow(
            'Invalid arguments for NepalTimezoneDate'
        )
        expect(() => new NepalTimezoneDate(2024, '11' as any, 28)).toThrow(
            'Invalid arguments for NepalTimezoneDate'
        )
    })

    it('should support all getters', () => {
        const npTz = new NepalTimezoneDate(2024, 0, 1, 0, 0, 0, 123)
        expect(npTz.getYear()).toBe(2024)
        expect(npTz.getMonth()).toBe(0)
        expect(npTz.getDate()).toBe(1)
        expect(npTz.getHours()).toBe(0)
        expect(npTz.getMinutes()).toBe(0)
        expect(npTz.getSeconds()).toBe(0)
        expect(npTz.getMilliseconds()).toBe(123)
        expect(npTz.getDay()).toBeGreaterThanOrEqual(0)
        expect(npTz.getDay()).toBeLessThanOrEqual(6)
        expect(typeof npTz.getTime()).toBe('number')
    })

    it('should handle edge of GMT+5:45 transition', () => {
        // 504901800000 = 1986-01-01T00:15:00+05:45 (Gregorian calendar)
        const npTz = new NepalTimezoneDate(1986, 0, 1, 0, 15)
        expect(npTz.getTime()).toBe(504901800000)
        expect(npTz.toString()).toBe('1986-01-01 00:15:00 GMT+0545')
    })

    it('should handle edge of GMT+5:30 transition', () => {
        // 504901799999 = 1985-12-31T23:59:59.999+05:30 (Gregorian calendar)
        const npTz = new NepalTimezoneDate(1985, 11, 31, 23, 59, 59, 999)
        expect(npTz.getTime()).toBe(504901799999)
        expect(npTz.toString()).toBe('1985-12-31 23:59:59 GMT+0545')
    })

    it('should return a new Date object from toDate()', () => {
        const npTz = new NepalTimezoneDate(2024, 11, 28, 20, 45, 35)
        const d = npTz.toDate()
        expect(d).toBeInstanceOf(Date)
        expect(d.getTime()).toBe(npTz.getTime())
    })
})
