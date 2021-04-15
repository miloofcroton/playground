import { normalizeNumber } from './decimal'

describe('decimal', () => {

  describe('normalizeNumber', () => {
    test('10', () => {
      expect(normalizeNumber('10')).toBe({
        significand: 1,
        exponent: 1,
      });
    })

  })


})
