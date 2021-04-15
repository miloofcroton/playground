import { normalizeNumber } from './decimal'

describe('decimal', () => {

  describe('normalizeNumber', () => {
    test('10', () => {
      expect(normalizeNumber('10')).toEqual({
        significand: new Uint8Array([1]),
        exponent: 1,
      });
    })
    test('100', () => {
      expect(normalizeNumber('100')).toEqual({
        significand: new Uint8Array([1]),
        exponent: 2,
      });
    })

  })


})
