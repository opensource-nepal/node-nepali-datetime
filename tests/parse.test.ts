import { parseFormat } from '../src/parse'

describe('parseFormat', () => {
    it('should parse format "YYYY-MM-DD HH:mm:ss.SSS"', () => {
        const dateParams = parseFormat(
            '2018-09-12 14:45:02.789',
            'YYYY-MM-DD HH:mm:ss.SSS'
        )
        expect(dateParams).toEqual([2018, 8, 12, 14, 45, 2, 789])
    })
})
