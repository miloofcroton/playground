import { normalizeNumber } from './decimal'

describe('decimal', () => {

  describe('normalizeNumber', () => {
    test('10', () => {
      expect(normalizeNumber('10')).toEqual({
        significand: '1',
        exponent: '1',
      });
    })
    test('100', () => {
      expect(normalizeNumber('100')).toEqual({
        significand: '1',
        exponent: '2',
      });
    })
    test('101', () => {
      expect(normalizeNumber('101')).toEqual({
        significand: '101',
        exponent: '0',
      });
    })

  })


})
