import { parseNepaliFormat } from '../../src/parse'

describe('parseNepaliFormat', () => {
    // another test will be covered from NepaliDate.parseNepaliFormat test
    it('parses the Nepali date-time string in Devanagari', () => {
        expect(
            parseNepaliFormat(
                'साल: २०८०, महिना: जेठ, गते(दिन): ३२, बार: बिहिबार, बार(आधा): बिहि, समय: १:३४:५६ पिम',
                'साल: YYYY, महिना: MMMM, गते(दिन): DD, बार: dddd, बार(आधा): ddd, समय: hh:mm:ss A'
            )
        ).toEqual([2080, 1, 32, 13, 34, 56, 0])
    })
})
