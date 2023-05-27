import dateConverter from '../src/dateConverter'

describe('dateConverter date range', () => {
    it('test for dateConverter english date range', () => {
        expect(dateConverter.enMinYear()).toBe(1944)
        expect(dateConverter.enMaxYear()).toBe(2042)

    })

    it('test for dateConverter english date range', () => {
        expect(dateConverter.npMinYear()).toBe(2000)
        expect(dateConverter.npMaxYear()).toBe(2099)
    })
})

describe('dateConverter englishToNepali', () => {
    test('should throw error on max year range', () => {
        expect(() => {
            dateConverter.englishToNepali(2060, 1, 4)
        }).toThrow('Date out of range')
    })

    test('should throw error on min year range', () => {
        expect(() => {
            dateConverter.englishToNepali(1920, 1, 4)
        }).toThrow('Date out of range')
    })

    test('should throw error on min month range', () => {
        expect(() => {
            dateConverter.englishToNepali(2023, -1, 4)
        }).toThrow('Date out of range')
    })

    test('should throw error on max month range', () => {
        expect(() => {
            dateConverter.englishToNepali(2023, 12, 4)
        }).toThrow('Date out of range')
    })

    test('should throw error on min day range', () => {
        expect(() => {
            dateConverter.englishToNepali(2023, 1, 0)
        }).toThrow('Date out of range')
    })

    test('should throw error on max day range', () => {
        expect(() => {
            dateConverter.englishToNepali(2023, 1, 40)
        }).toThrow('Date out of range')
    })

    test('should return valid past Nepali date', () => {
        const [y, m, d] = dateConverter.englishToNepali(1994, 7, 13)
        expect(y).toBe(2051)
        expect(m).toBe(3)
        expect(d).toBe(29)
    })

    test('should return valid recent Nepali date', () => {
        const [y, m, d] = dateConverter.englishToNepali(2023, 0, 28)
        expect(y).toBe(2079)
        expect(m).toBe(9)
        expect(d).toBe(14)
    })

    test('should return valid future Nepali date', () => {
        const [y, m, d] = dateConverter.englishToNepali(2030, 10, 26)
        expect(y).toBe(2087)
        expect(m).toBe(7)
        expect(d).toBe(10)
    })

    test('should return valid Nepali date for min edge date', () => {
        const [y, m, d] = dateConverter.englishToNepali(1944, 0, 1)
        expect(y).toBe(2000)
        expect(m).toBe(8)
        expect(d).toBe(17)
    })

    test('should return valid Nepali date for max edge date', () => {
        const [y, m, d] = dateConverter.englishToNepali(2042, 11, 31)
        expect(y).toBe(2099)
        expect(m).toBe(8)
        expect(d).toBe(16)
    })
})

describe('dateConverter nepaliToEnglish', () => {

    it('should throw an error on max year range', () => {
        expect(() => {
            dateConverter.nepaliToEnglish(3000, 1, 4)
        }).toThrow('Date out of range')
    })

    it('should throw an error on min year range', () => {
        expect(() => {
            dateConverter.nepaliToEnglish(1920, 1, 4)
        }).toThrow('Date out of range')
    })

    it('should throw an error on min month range', () => {
        expect(() => {
            dateConverter.nepaliToEnglish(2079, -1, 4)
        }).toThrow('Date out of range')
    })

    it('should throw an error on max month range', () => {
        expect(() => {
            dateConverter.nepaliToEnglish(2079, 12, 4)
        }).toThrow('Date out of range')
    })

    it('should throw an error on min day range', () => {
        expect(() => {
            dateConverter.nepaliToEnglish(2079, 1, 0)
        }).toThrow('Date out of range')
    })

    it('should throw an error on max day range', () => {
        expect(() => {
            dateConverter.nepaliToEnglish(2079, 1, 40)
        }).toThrow('Date out of range')
    })

    it('should return valid past English date', () => {
        const [y, m, d] = dateConverter.nepaliToEnglish(2051, 3, 29)
        expect(y).toBe(1994)
        expect(m).toBe(7)
        expect(d).toBe(13)
    })

    it('should return valid recent English date', () => {
        const [y, m, d] = dateConverter.nepaliToEnglish(2079, 9, 14)
        expect(y).toBe(2023)
        expect(m).toBe(0)
        expect(d).toBe(28)
    })

    it('should return valid future English date', () => {
        const [y, m, d] = dateConverter.nepaliToEnglish(2087, 7, 10)
        expect(y).toBe(2030)
        expect(m).toBe(10)
        expect(d).toBe(26)
    })

    it('should return valid English leap year date', () => {
        const [y, m, d] = dateConverter.nepaliToEnglish(2080, 11, 15)
        expect(y).toBe(2024)
        expect(m).toBe(2)
        expect(d).toBe(28)
    })

    it('should return valid English date for min edge date', () => {
        const [y, m, d] = dateConverter.nepaliToEnglish(2000, 0, 1)
        expect(y).toBe(1943)
        expect(m).toBe(3)
        expect(d).toBe(14)
    })

    it('should return valid English date for max edge date', () => {
        const [y, m, d] = dateConverter.nepaliToEnglish(2099, 11, 30)
        expect(y).toBe(2043)
        expect(m).toBe(3)
        expect(d).toBe(13)
    })

})
