import { parseFormatTokens, seqToRE } from '../src/utils'

describe('parseFormatTokens', () => {
    it('should parse format "YYYY"', () => {
        expect(parseFormatTokens('YYYY')).toEqual(['YYYY'])
    })

    it('should parse format "YYYY-MM-DD"', () => {
        expect(parseFormatTokens('YYYY-MM-DD')).toEqual(['YYYY', '-', 'MM', '-', 'DD'])
    })

    it('should parse format "YYYYY"', () => {
        expect(parseFormatTokens('YYYYY')).toEqual(['YYYY', 'Y'])
    })

    it('should parse format "YYY"', () => {
        expect(parseFormatTokens('YYY')).toEqual(['YY', 'Y'])
    })

    it('should parse format "WETUIPQNBVCXZ"', () => {
        expect(parseFormatTokens('WETUIPQNBVCXZ')).toEqual([
            'W',
            'E',
            'T',
            'U',
            'I',
            'P',
            'Q',
            'N',
            'B',
            'V',
            'C',
            'X',
            'Z',
        ])
    })

    it('should parse format "YYYYWETUIPQNBVCXZ"', () => {
        expect(parseFormatTokens('YYYYWETUIPQNBVCXZ')).toEqual([
            'YYYY',
            'W',
            'E',
            'T',
            'U',
            'I',
            'P',
            'Q',
            'N',
            'B',
            'V',
            'C',
            'X',
            'Z',
        ])
    })

    it('should parse format "YYYYWETUIPQNBVCXZDD"', () => {
        expect(parseFormatTokens('YYYYWETUIPQNBVCXZDD')).toEqual([
            'YYYY',
            'W',
            'E',
            'T',
            'U',
            'I',
            'P',
            'Q',
            'N',
            'B',
            'V',
            'C',
            'X',
            'Z',
            'DD',
        ])
    })

    it('should parse format "YYYY \'ello DD"', () => {
        expect(parseFormatTokens("YYYY 'ello DD")).toEqual([
            'YYYY',
            ' ',
            "'",
            'e',
            'l',
            'l',
            'o',
            ' ',
            'DD',
        ])
    })

    it('should parse format "YYYY-MM-DD HH:mm:ss:SSS"', () => {
        expect(parseFormatTokens('YYYY-MM-DD HH:mm:ss:SSS')).toEqual([
            'YYYY',
            '-',
            'MM',
            '-',
            'DD',
            ' ',
            'HH',
            ':',
            'mm',
            ':',
            'ss',
            ':',
            'SSS',
        ])
    })

    it('should parse format "[[[]]]"', () => {
        expect(parseFormatTokens('[[[]]]')).toEqual(['[', '[', ']]'])
    })

    it('should parse format "[[', () => {
        expect(parseFormatTokens('[[')).toEqual(['[', '['])
    })

    it('should parse format "]]"', () => {
        expect(parseFormatTokens(']]')).toEqual([']', ']'])
    })

    it('should parse format "[[]]"', () => {
        expect(parseFormatTokens('[[]]')).toEqual(['[', ']'])
    })

    it('should parse format "[[]', () => {
        expect(parseFormatTokens('[[]')).toEqual(['[', ''])
    })

    it('should parse format "[]]"', () => {
        expect(parseFormatTokens('[]]')).toEqual([']'])
    })

    it('should parse format "[[Y]]"', () => {
        expect(parseFormatTokens('[[Y]]')).toEqual(['[', 'Y]'])
    })

    it('should parse format "[YYYY"', () => {
        expect(parseFormatTokens('[YYYY')).toEqual(['[', 'YYYY'])
    })

    it('should parse format "[Y]"', () => {
        expect(parseFormatTokens('[Y]')).toEqual(['Y'])
    })

    it('should parse format "Today is dddd"', () => {
        expect(parseFormatTokens('Today is dddd')).toEqual([
            'T',
            'o',
            'd',
            'a',
            'y',
            ' ',
            'i',
            's',
            ' ',
            'dddd',
        ])
    })

    it('should parse format "[Today is ]dddd"', () => {
        expect(parseFormatTokens('[Today is ]dddd')).toEqual(['Today is ', 'dddd'])
    })

    it('should parse format "YYY[Today is ]dddd"', () => {
        expect(parseFormatTokens('YYY[Today is ]dddd')).toEqual([
            'YY',
            'Y',
            'Today is ',
            'dddd',
        ])
    })

    it("should returns empty doesn't match with FORMAT_TOKEN_REGEX", () => {
        expect(parseFormatTokens('')).toEqual([])
    })
})

describe('seqToRE', () => {
    it('runs seqToRE', () => {
        const myArray = ['a', 'b', 'c']
        let res = seqToRE(myArray)

        expect(res).toEqual(/(a|b|c)/)
    })

    it('handles almost duplicate array strings', () => {
        const myArray = ['abc', 'abcdef', 'abcd', 'abcde']
        let res = seqToRE(myArray)

        expect(res).toEqual(/(abcdef|abcde|abcd|abc)/)
    })

    it('handles empty array', () => {
        const emptyArray: Array<string> = []
        let res = seqToRE(emptyArray)

        expect(res).toEqual(/(?:)/)
    })

    it('handles empty string in array', () => {
        const arrayWithEmptyString = ['']
        let res = seqToRE(arrayWithEmptyString)

        expect(res).toEqual(/(?:)/)
    })
})
