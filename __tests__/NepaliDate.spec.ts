import NepaliDate from "../src/NepaliDate"
import { ValidationError } from "../src/validators"

describe("NepaliDate", () => {
    it("checks for nepali date validity", () => {
        // 373314600000
        // Fri Oct 30 1981 18:30:00 GMT+0000
        // Sat Oct 31 1981 00:00:00 GMT+0530 (Nepal Time)
        const n = new NepaliDate(new Date(373314600000))
        expect(n.toString()).toBe("2038-07-15 00:00:00")
        expect(n.getYear()).toBe(2038)
        expect(n.getEnglishYear()).toBe(1981)
        expect(n.getMonth()).toBe(6)
        expect(n.getEnglishMonth()).toBe(9)
        expect(n.getDate()).toBe(15)
        expect(n.getEnglishDate()).toBe(31)
        expect(n.getDateObject().getUTCDate()).toEqual(30)
        expect(n.getDay()).toBe(6)
    })

    it("checks parser for date only", () => {
        const n = new NepaliDate("2038-07-15")
        expect(n.toString()).toBe("2038-07-15 00:00:00")

        const n2 = new NepaliDate("2075.03.22")
        expect(n2.toString()).toBe("2075-03-22 00:00:00")
        expect(n2.getDateObject().toISOString()).toEqual("2018-07-05T18:15:00.000Z")
        expect(n2.getEnglishYear()).toBe(2018)
        expect(n2.getEnglishMonth()).toBe(6)
        expect(n2.getEnglishDate()).toBe(6)
    })

    it("checks parser for date and time", () => {
        const n = new NepaliDate("2080-07-15 7:18")
        expect(n.toString()).toBe("2080-07-15 07:18:00")
        expect(n.getHours()).toBe(7)
        expect(n.getMinutes()).toBe(18)
        expect(n.getSeconds()).toBe(0)
        expect(n.getMilliseconds()).toBe(0)

        const n1 = new NepaliDate("2080-07-15 17:07:1:888")
        expect(n1.toString()).toBe("2080-07-15 17:07:01.888")
        expect(n1.getHours()).toBe(17)
        expect(n1.getMinutes()).toBe(7)
        expect(n1.getSeconds()).toBe(1)
        expect(n1.getMilliseconds()).toBe(888)
    })

    it("checks format", () => {
        const n = new NepaliDate("2038-07-15")
        expect(n.formatNepali("YYYY/MM/DD")).toBe("२०३८/०७/१५")
        expect(n.formatNepali("YY-M-D")).toBe("३८-७-१५")
        expect(n.format("YYYY-MM-DD")).toBe("2038-07-15")
        expect(n.format("YY-M-D")).toBe("38-7-15")
        expect(n.formatNepali("Y-MMMM-ddd")).toBe("२०३८-कार्तिक-शनि")
        expect(n.format('"YYY" YYYY')).toBe("YYY 2038")
    })

    it("checks month, date setting", () => {
        const n = new NepaliDate(2074, 11, 3)
        expect(n.toString()).toBe("2074-12-03 00:00:00")
        n.setMonth(3)
        expect(n.toString()).toBe("2074-04-03 00:00:00")
        const n2 = new NepaliDate(2075, 2, 32)
        n2.setDate(10)
        expect(n2.toString()).toBe("2075-03-10 00:00:00")
        n2.setDate(1)
        expect(n2.toString()).toBe("2075-03-01 00:00:00")
    })

    it("checks for all methods", () => {
        const d = new Date("2017-10-31T12:30:25.789Z")
        const n = new NepaliDate(d)

        expect(n.getTime()).toBe(1509453025789)
        expect(n.getDay()).toBe(2)
        expect(n.getHours()).toBe(18)
        expect(n.getMinutes()).toBe(15)
        expect(n.getSeconds()).toBe(25)
        expect(n.getMilliseconds()).toBe(789)
    })

    it('should be initialized from fromEnglishDate', () => {
        const n = NepaliDate.fromEnglishDate(2019, 2, 11, 3, 29, 38, 689)

        // checking nepali calendar date
        expect(n.toString()).toBe("2075-11-27 03:29:38.689")
        expect(n.getYear()).toBe(2075)
        expect(n.getMonth()).toBe(10)
        expect(n.getDate()).toBe(27)
        expect(n.getDay()).toBe(1)

        // checking nepali time
        expect(n.getHours()).toBe(3)
        expect(n.getMinutes()).toBe(29)
        expect(n.getSeconds()).toBe(38)
        expect(n.getMilliseconds()).toBe(689)

        // checking date object
        expect(n.getTime()).toEqual(1552254278689)
        expect(n.getDateObject().toISOString()).toEqual("2019-03-10T21:44:38.689Z")

        // checking english calendar date
        expect(n.getEnglishYear()).toBe(2019)
        expect(n.getEnglishMonth()).toBe(2)
        expect(n.getEnglishDate()).toBe(11)
    })

    it('should be initialized from fromEnglishDate for +5:30 timezone', () => {
        const n = NepaliDate.fromEnglishDate(1944, 2, 11, 3, 29, 38, 689)

        // checking nepali calendar date
        expect(n.toString()).toBe("2000-11-28 03:29:38.689")
        expect(n.getYear()).toBe(2000)
        expect(n.getMonth()).toBe(10)
        expect(n.getDate()).toBe(28)
        expect(n.getDay()).toBe(6)

        // checking nepali time
        expect(n.getHours()).toBe(3)
        expect(n.getMinutes()).toBe(29)
        expect(n.getSeconds()).toBe(38)
        expect(n.getMilliseconds()).toBe(689)

        // checking date object
        expect(n.getTime()).toEqual(-814500021311)
        expect(n.getDateObject().toISOString()).toEqual("1944-03-10T21:59:38.689Z")

        // checking english calendar date
        expect(n.getEnglishYear()).toBe(1944)
        expect(n.getEnglishMonth()).toBe(2)
        expect(n.getEnglishDate()).toBe(11)
    })

})

describe("NepaliDate with Time feature initialization", () => {
    // Test case for time support
    it("should support hours", () => {
        const d = new NepaliDate(2080, 1, 12, 1)
        expect(d.getHours()).toBe(1)
        expect(d.getMinutes()).toBe(0)
        expect(d.getSeconds()).toBe(0)
        expect(d.getMilliseconds()).toBe(0)
    })

    it("should support minutes", () => {
        const d = new NepaliDate(2080, 1, 12, 1, 2)
        expect(d.getHours()).toBe(1)
        expect(d.getMinutes()).toBe(2)
        expect(d.getSeconds()).toBe(0)
        expect(d.getMilliseconds()).toBe(0)
    })

    it("should support seconds", () => {
        const d = new NepaliDate(2080, 1, 12, 1, 2, 3)
        expect(d.getHours()).toBe(1)
        expect(d.getMinutes()).toBe(2)
        expect(d.getSeconds()).toBe(3)
        expect(d.getMilliseconds()).toBe(0)
    })

    it("should support milliseconds", () => {
        const d = new NepaliDate(2080, 1, 12, 1, 2, 3, 4)
        expect(d.getHours()).toBe(1)
        expect(d.getMinutes()).toBe(2)
        expect(d.getSeconds()).toBe(3)
        expect(d.getMilliseconds()).toBe(4)
    })

    // Test case for valid time components
    it('should not throw an error for valid time components', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = 12
        const minute = 30
        const second = 45
        const ms = 500

        expect(() => {
            const _ = new NepaliDate(year, month, day, hour, minute, second, ms)
        }).not.toThrow()
    })

    // Test cases for invalid time components
    it('should throw a ValidationError for invalid hour', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = 24
        const minute = 30
        const second = 45
        const ms = 500

        expect(() => {
            const _ = new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Hour should be in the range 0-23'))
    })

    it('should throw a ValidationError for invalid negative hour', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = -1
        const minute = 30
        const second = 45
        const ms = 500

        expect(() => {
            const _ = new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Hour should be in the range 0-23'))
    })

    it('should throw a ValidationError for invalid minute', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = 12
        const minute = 60
        const second = 45
        const ms = 500

        expect(() => {
            const _ = new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Minute should be in the range 0-59'))
    })

    it('should throw a ValidationError for invalid negative minute', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = 12
        const minute = -1
        const second = 45
        const ms = 500

        expect(() => {
            const _ = new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Minute should be in the range 0-59'))
    })

    it('should throw a ValidationError for invalid second', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = 12
        const minute = 30
        const second = 60
        const ms = 500

        expect(() => {
            const _ = new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Second should be in the range 0-59'))
    })

    it('should throw a ValidationError for invalid negative second', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = 12
        const minute = 30
        const second = -1
        const ms = 500

        expect(() => {
            const _ = new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Second should be in the range 0-59'))
    })

    it('should throw a ValidationError for invalid millisecond', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = 12
        const minute = 30
        const second = 45
        const ms = 1000

        expect(() => {
            const _ = new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Millisecond should be in the range 0-999'))
    })

    it('should throw a ValidationError for invalid negative millisecond', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = 12
        const minute = 30
        const second = 45
        const ms = -1

        expect(() => {
            const _ = new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Millisecond should be in the range 0-999'))
    })

    // timezone support

    it('should set the Nepali hours and minutes from a given time when running on a different timezone system', () => {
        const t = 1686501122598  // Sun Jun 11 2023 22:17:02 GMT+0545 (Nepal Time)
        const d = new NepaliDate(t)

        expect(d.getHours()).toBe(22)
        expect(d.getMinutes()).toBe(17)
    })

    it('should set the unix timestamp from a given nepali params when running on a different timezone system', () => {
        const d = new NepaliDate(2080, 1, 28, 22, 17, 2, 598)

        expect(d.getTime()).toBe(1686501122598) // Sun Jun 11 2023 22:17:02 GMT+0545 (Nepal Time)
        expect(d.getHours()).toBe(22)
        expect(d.getMinutes()).toBe(17)
    })

    it('should support date and time of past year with GMT+5:30', () => {
        // -807708794322
        // Sun May 28 1944 12:26:45 GMT+0000
        // Sun May 28 1944 17:56:45 GMT+0530 (Nepal Time)
        const d = new NepaliDate(2001, 1, 15, 17, 56, 45, 678)

        // timestamp
        expect(d.getTime()).toBe(-807708794322)

        // dates
        expect(d.getYear()).toBe(2001)
        expect(d.getMonth()).toBe(1)
        expect(d.getDate()).toBe(15)
        expect(d.getDay()).toBe(0)

        // times
        expect(d.getHours()).toBe(17)
        expect(d.getMinutes()).toBe(56)
        expect(d.getSeconds()).toBe(45)
        expect(d.getMilliseconds()).toBe(678)

        // english dates and times
        expect(d.getDateObject().getUTCFullYear()).toBe(1944)
        expect(d.getDateObject().getUTCMonth()).toBe(4)
        expect(d.getDateObject().getUTCDate()).toBe(28)
        expect(d.getDateObject().getUTCHours()).toBe(12)
        expect(d.getDateObject().getUTCMinutes()).toBe(26)
        expect(d.getDateObject().getUTCSeconds()).toBe(45)
        expect(d.getDateObject().getUTCMilliseconds()).toBe(678)
    })

    it('should support timestamp of past year with GMT+5:30', () => {
        // -807708794322
        // Sun May 28 1944 12:26:45 GMT+0000
        // Sun May 28 1944 17:56:45 GMT+0530 (Nepal Time)

        const d = new NepaliDate(-807708794322)

        // timestamp
        expect(d.getTime()).toBe(-807708794322)

        // dates
        expect(d.getYear()).toBe(2001)
        expect(d.getMonth()).toBe(1)
        expect(d.getDate()).toBe(15)

        // times
        expect(d.getHours()).toBe(17)
        expect(d.getMinutes()).toBe(56)
        expect(d.getSeconds()).toBe(45)
        expect(d.getMilliseconds()).toBe(678)

        // english dates and times
        expect(d.getDateObject().getUTCFullYear()).toBe(1944)
        expect(d.getDateObject().getUTCMonth()).toBe(4)
        expect(d.getDateObject().getUTCDate()).toBe(28)
        expect(d.getDateObject().getUTCHours()).toBe(12)
        expect(d.getDateObject().getUTCMinutes()).toBe(26)
        expect(d.getDateObject().getUTCSeconds()).toBe(45)
        expect(d.getDateObject().getUTCMilliseconds()).toBe(678)
    })

    it('should support date and time of recent year with GMT+5:45', () => {
        // 1685362305678
        // Mon May 29 2023 12:11:45 GMT+0000
        // Mon May 29 2023 17:56:45 GMT+0545 (Nepal Time)

        const d = new NepaliDate(2080, 1, 15, 17, 56, 45, 678)

        // timestamp
        expect(d.getTime()).toBe(1685362305678)

        // dates
        expect(d.getYear()).toBe(2080)
        expect(d.getMonth()).toBe(1)
        expect(d.getDate()).toBe(15)

        // times
        expect(d.getHours()).toBe(17)
        expect(d.getMinutes()).toBe(56)
        expect(d.getSeconds()).toBe(45)
        expect(d.getMilliseconds()).toBe(678)

        // english dates and times
        expect(d.getDateObject().getUTCFullYear()).toBe(2023)
        expect(d.getDateObject().getUTCMonth()).toBe(4)
        expect(d.getDateObject().getUTCDate()).toBe(29)
        expect(d.getDateObject().getUTCHours()).toBe(12)
        expect(d.getDateObject().getUTCMinutes()).toBe(11)
        expect(d.getDateObject().getUTCSeconds()).toBe(45)
        expect(d.getDateObject().getUTCMilliseconds()).toBe(678)
    })

    it('should support timestamp of recent year with GMT+5:45', () => {
        // 1685362305678
        // Mon May 29 2023 12:11:45 GMT+0000
        // Mon May 29 2023 17:56:45 GMT+0545 (Nepal Time)

        const d = new NepaliDate(1685362305678)

        // timestamp
        expect(d.getTime()).toBe(1685362305678)

        // dates
        expect(d.getYear()).toBe(2080)
        expect(d.getMonth()).toBe(1)
        expect(d.getDate()).toBe(15)

        // times
        expect(d.getHours()).toBe(17)
        expect(d.getMinutes()).toBe(56)
        expect(d.getSeconds()).toBe(45)
        expect(d.getMilliseconds()).toBe(678)

        // english dates and times
        expect(d.getDateObject().getUTCFullYear()).toBe(2023)
        expect(d.getDateObject().getUTCMonth()).toBe(4)
        expect(d.getDateObject().getUTCDate()).toBe(29)
        expect(d.getDateObject().getUTCHours()).toBe(12)
        expect(d.getDateObject().getUTCMinutes()).toBe(11)
        expect(d.getDateObject().getUTCSeconds()).toBe(45)
        expect(d.getDateObject().getUTCMilliseconds()).toBe(678)
    })

    it('should support date and time of edge of GMT+5:45', () => {
        // 504901800000
        // Tue Dec 31 1985 18:30:00 GMT+0000
        // Wed Jan 1 1986 00:15:00 GMT+05:45 (Nepal Time)

        const d = new NepaliDate(2042, 8, 17, 0, 0)

        // timestamp
        expect(d.getTime()).toBe(504901800000)

        // dates
        expect(d.getYear()).toBe(2042)
        expect(d.getMonth()).toBe(8)
        expect(d.getDate()).toBe(17)

        // times
        expect(d.getHours()).toBe(0)
        expect(d.getMinutes()).toBe(15)
        expect(d.getSeconds()).toBe(0)
        expect(d.getMilliseconds()).toBe(0)

        // english dates and times
        expect(d.getDateObject().getUTCFullYear()).toBe(1985)
        expect(d.getDateObject().getUTCMonth()).toBe(11)
        expect(d.getDateObject().getUTCDate()).toBe(31)
        expect(d.getDateObject().getUTCHours()).toBe(18)
        expect(d.getDateObject().getUTCMinutes()).toBe(30)
        expect(d.getDateObject().getUTCSeconds()).toBe(0)
        expect(d.getDateObject().getUTCMilliseconds()).toBe(0)
    })

    it('should support timestamp of edge of GMT+5:45', () => {
        // 504901800000
        // Tue Dec 31 1985 18:30:00 GMT+0000
        // Wed Jan 1 1986 00:15:00 GMT+05:45 (Nepal Time)

        const d = new NepaliDate(504901800000)

        // timestamp
        expect(d.getTime()).toBe(504901800000)

        // dates
        expect(d.getYear()).toBe(2042)
        expect(d.getMonth()).toBe(8)
        expect(d.getDate()).toBe(17)

        // times
        expect(d.getHours()).toBe(0)
        expect(d.getMinutes()).toBe(15)
        expect(d.getSeconds()).toBe(0)
        expect(d.getMilliseconds()).toBe(0)

        // english dates and times
        expect(d.getDateObject().getUTCFullYear()).toBe(1985)
        expect(d.getDateObject().getUTCMonth()).toBe(11)
        expect(d.getDateObject().getUTCDate()).toBe(31)
        expect(d.getDateObject().getUTCHours()).toBe(18)
        expect(d.getDateObject().getUTCMinutes()).toBe(30)
        expect(d.getDateObject().getUTCSeconds()).toBe(0)
        expect(d.getDateObject().getUTCMilliseconds()).toBe(0)
    })

    it('should support date and time of edge of GMT+5:30', () => {
        // 504901799999
        // Tue Dec 31 1985 18:29:59.999 GMT+0000
        // Tue Dec 31 1985 23:59:59.999 GMT+05:30 (Nepal Time)

        const d = new NepaliDate(2042, 8, 16, 23, 59, 59, 999)

        // timestamp
        expect(d.getTime()).toBe(504901799999)

        // dates
        expect(d.getYear()).toBe(2042)
        expect(d.getMonth()).toBe(8)
        expect(d.getDate()).toBe(16)

        // times
        expect(d.getHours()).toBe(23)
        expect(d.getMinutes()).toBe(59)
        expect(d.getSeconds()).toBe(59)
        expect(d.getMilliseconds()).toBe(999)

        // english dates and times
        expect(d.getDateObject().getUTCFullYear()).toBe(1985)
        expect(d.getDateObject().getUTCMonth()).toBe(11)
        expect(d.getDateObject().getUTCDate()).toBe(31)
        expect(d.getDateObject().getUTCHours()).toBe(18)
        expect(d.getDateObject().getUTCMinutes()).toBe(29)
        expect(d.getDateObject().getUTCSeconds()).toBe(59)
        expect(d.getDateObject().getUTCMilliseconds()).toBe(999)
    })

    it('should support timestamp of edge of GMT+5:30', () => {
        // 504901799999
        // Tue Dec 31 1985 18:29:59.999 GMT+0000
        // Tue Dec 31 1985 23:59:59.999 GMT+05:30 (Nepal Time)

        const d = new NepaliDate(504901799999)

        // timestamp
        expect(d.getTime()).toBe(504901799999)

        // dates
        expect(d.getYear()).toBe(2042)
        expect(d.getMonth()).toBe(8)
        expect(d.getDate()).toBe(16)

        // times
        expect(d.getHours()).toBe(23)
        expect(d.getMinutes()).toBe(59)
        expect(d.getSeconds()).toBe(59)
        expect(d.getMilliseconds()).toBe(999)

        // english dates and times
        expect(d.getDateObject().getUTCFullYear()).toBe(1985)
        expect(d.getDateObject().getUTCMonth()).toBe(11)
        expect(d.getDateObject().getUTCDate()).toBe(31)
        expect(d.getDateObject().getUTCHours()).toBe(18)
        expect(d.getDateObject().getUTCMinutes()).toBe(29)
        expect(d.getDateObject().getUTCSeconds()).toBe(59)
        expect(d.getDateObject().getUTCMilliseconds()).toBe(999)
    })

    it('should support date and time of edge of GMT+5:45 after 15 minutes', () => {
        // 504901860000
        // Tue Dec 31 1985 18:31:00 GMT+0000
        // Wed Jan 1 1986 00:16:00 GMT+05:45 (Nepal Time)

        const d = new NepaliDate(2042, 8, 17, 0, 16)

        // timestamp
        expect(d.getTime()).toBe(504901860000)

        // dates
        expect(d.getYear()).toBe(2042)
        expect(d.getMonth()).toBe(8)
        expect(d.getDate()).toBe(17)

        // times
        expect(d.getHours()).toBe(0)
        expect(d.getMinutes()).toBe(16)
        expect(d.getSeconds()).toBe(0)
        expect(d.getMilliseconds()).toBe(0)

        // english dates and times
        expect(d.getDateObject().getUTCFullYear()).toBe(1985)
        expect(d.getDateObject().getUTCMonth()).toBe(11)
        expect(d.getDateObject().getUTCDate()).toBe(31)
        expect(d.getDateObject().getUTCHours()).toBe(18)
        expect(d.getDateObject().getUTCMinutes()).toBe(31)
        expect(d.getDateObject().getUTCSeconds()).toBe(0)
        expect(d.getDateObject().getUTCMilliseconds()).toBe(0)
    })

    it('should support timestamp of edge of GMT+5:45 after 15 minutes', () => {
        // 504901860000
        // Tue Dec 31 1985 18:31:00 GMT+0000
        // Wed Jan 1 1986 00:16:00 GMT+05:45 (Nepal Time)

        const d = new NepaliDate(504901860000)

        // timestamp
        expect(d.getTime()).toBe(504901860000)

        // dates
        expect(d.getYear()).toBe(2042)
        expect(d.getMonth()).toBe(8)
        expect(d.getDate()).toBe(17)

        // times
        expect(d.getHours()).toBe(0)
        expect(d.getMinutes()).toBe(16)
        expect(d.getSeconds()).toBe(0)
        expect(d.getMilliseconds()).toBe(0)

        // english dates and times
        expect(d.getDateObject().getUTCFullYear()).toBe(1985)
        expect(d.getDateObject().getUTCMonth()).toBe(11)
        expect(d.getDateObject().getUTCDate()).toBe(31)
        expect(d.getDateObject().getUTCHours()).toBe(18)
        expect(d.getDateObject().getUTCMinutes()).toBe(31)
        expect(d.getDateObject().getUTCSeconds()).toBe(0)
        expect(d.getDateObject().getUTCMilliseconds()).toBe(0)
    })
})


describe('NepaliDate with Time feature: set methods', () => {
    let nepaliDate: NepaliDate

    beforeEach(() => {
        nepaliDate = new NepaliDate()
    })

    describe('setHours', () => {
        it('should set the hour on the current date and time', () => {
            const hour = 9
            nepaliDate.setHours(hour)

            expect(nepaliDate.getHours()).toBe(hour)
        })

        it('should throw a ValidationError for invalid hour', () => {
            const invalidHour = 24
            expect(() => {
                nepaliDate.setHours(invalidHour)
            }).toThrowError(new ValidationError('Hour should be in the range 0-23'))
        })
    })

    describe('setMinutes', () => {
        it('should set the minute on the current date and time', () => {
            const minute = 30
            nepaliDate.setMinutes(minute)

            expect(nepaliDate.getMinutes()).toBe(minute)
        })

        it('should throw a ValidationError for invalid minute', () => {
            const invalidMinute = 60
            expect(() => {
                nepaliDate.setMinutes(invalidMinute)
            }).toThrowError(new ValidationError('Minute should be in the range 0-59'))
        })
    })

    describe('setSeconds', () => {
        it('should set the second on the current date and time', () => {
            const second = 30
            nepaliDate.setSeconds(second)

            expect(nepaliDate.getSeconds()).toBe(second)
        })

        it('should throw a ValidationError for invalid second', () => {
            const invalidSecond = 60
            expect(() => {
                nepaliDate.setSeconds(invalidSecond)
            }).toThrowError(new ValidationError('Second should be in the range 0-59'))
        })
    })

    describe('setMilliseconds', () => {
        it('should set the milliseconds on the current date and time', () => {
            const milliseconds = 30
            nepaliDate.setMilliseconds(milliseconds)

            expect(nepaliDate.getMilliseconds()).toBe(milliseconds)
        })

        it('should throw a ValidationError for invalid milliseconds', () => {
            const invalidMillisecond = 1000
            expect(() => {
                nepaliDate.setMilliseconds(invalidMillisecond)
            }).toThrowError(new ValidationError('Millisecond should be in the range 0-999'))
        })
    })

    describe('setTime', () => {
        it('should set the timestamp', () => {
            const timestamp = 1625097600000 // June 30, 2021 00:00:00 UTC
            nepaliDate.setTime(timestamp)
            expect(nepaliDate.getTime()).toBe(timestamp)
        })
    })
})
