import NepaliDate from "../src/NepaliDate"
import { ValidationError } from "../src/validators"

describe("NepaliDate", () => {
    it("checks for nepali date validity", () => {
        const n = new NepaliDate(new Date("1981.10.31"))
        expect(n.toString()).toBe("2038/7/15")
        expect(n.getYear()).toBe(2038)
        expect(n.getMonth()).toBe(6)
        expect(n.getDate()).toBe(15)
        expect(n.getDay()).toBe(6)

        const n2 = new NepaliDate(new Date("2018-08-17"))
        expect(n2.toString()).toBe("2075/5/1")
    })

    it("checks parser", () => {
        const n = new NepaliDate("2038-07-15")
        expect(n.toString()).toBe("2038/7/15")

        const n2 = new NepaliDate("2075.03.22")
        expect(n2.toString()).toBe("2075/3/22")

        expect(n2.getEnglishDate().toISOString()).toEqual("2018-07-05T18:15:00.000Z")
    })

    it("checks format", () => {
        const n = new NepaliDate("2038-07-15")
        // expect(n.format("yyyy/mm/dd")).toBe("२०३८/०७/१५")
        // expect(n.format("yy-m-d")).toBe("३८-७-१५")
        expect(n.format("YYYY-MM-DD")).toBe("2038-07-15")
        expect(n.format("YY-M-D")).toBe("38-7-15")
        // expect(n.format("Y-MMMM-ddd")).toBe("38-Kartik-शनि")
        expect(n.format('"YYY" YYYY')).toBe("YYY 2038")
    })

    it("checks month, date setting", () => {
        const n = new NepaliDate(2074, 11, 3)
        expect(n.toString()).toBe("2074/12/3")
        n.setMonth(3)
        expect(n.toString()).toBe("2074/4/3")
        const n2 = new NepaliDate(2075, 2, 32)
        n2.setDate(10)
        expect(n2.toString()).toBe("2075/3/10")
        n2.setDate(1)
        expect(n2.toString()).toBe("2075/3/1")
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
            new NepaliDate(year, month, day, hour, minute, second, ms)
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
            new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Hour should be in the range 0-23'))
    })

    it('should throw a ValidationError for invalid negative hour', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = -1
        const minute = 30
        const second = 45
        const ms = 500

        expect(() => {
            new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Hour should be in the range 0-23'))
    })

    it('should throw a ValidationError for invalid minute', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = 12
        const minute = 60
        const second = 45
        const ms = 500

        expect(() => {
            new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Minute should be in the range 0-59'))
    })

    it('should throw a ValidationError for invalid negative minute', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = 12
        const minute = -1
        const second = 45
        const ms = 500

        expect(() => {
            new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Minute should be in the range 0-59'))
    })

    it('should throw a ValidationError for invalid second', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = 12
        const minute = 30
        const second = 60
        const ms = 500

        expect(() => {
            new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Second should be in the range 0-59'))
    })

    it('should throw a ValidationError for invalid negative second', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = 12
        const minute = 30
        const second = -1
        const ms = 500

        expect(() => {
            new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Second should be in the range 0-59'))
    })

    it('should throw a ValidationError for invalid millisecond', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = 12
        const minute = 30
        const second = 45
        const ms = 1000

        expect(() => {
            new NepaliDate(year, month, day, hour, minute, second, ms)
        }).toThrowError(new ValidationError('Millisecond should be in the range 0-999'))
    })

    it('should throw a ValidationError for invalid negative millisecond', () => {
        const [year, month, day] = [2080, 1, 12]
        const hour = 12
        const minute = 30
        const second = 45
        const ms = -1

        expect(() => {
            new NepaliDate(year, month, day, hour, minute, second, ms)
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
