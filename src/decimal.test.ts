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

    test('101.00', () => {
      expect(normalizeNumber('101')).toEqual({
        significand: '101',
        exponent: '0',
      });
    })

    test('101.01', () => {
      expect(normalizeNumber('101.01')).toEqual({
        significand: '10101',
        exponent: '-2',
      });
    })

    test('1.1', () => {
      expect(normalizeNumber('1.1')).toEqual({
        significand: '11',
        exponent: '-1',
      });
    })

    test('0.1', () => {
      expect(normalizeNumber('0.1')).toEqual({
        significand: '1',
        exponent: '-1',
      });
    })


  })


})
