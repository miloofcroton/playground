import {
  normalize,
  serialize,
  deserialize,
  DeserializedNumber,
} from './decimal'

describe('decimal', () => {
  let deserializedData, serializedData;
  beforeAll(() => {
    const emptyArray = Array(2).fill({})

    const posArray: DeserializedNumber[] = emptyArray
      .map((el, i) => ({
        significand: new Uint8Array([1, 0]),
        // significand: new Uint8Array([255, 255]),
        exponent: i,
      }))

    const negArray: DeserializedNumber[] = emptyArray
      .map((el, i) => ({
        significand: new Uint8Array([255, 255, 1]),
        exponent: i === 0 ? 0 : -i,
      }))


    const origData = [
      ...posArray,
      // ...negArray,
    ]

    const deserializedData = origData
      .map(deserialize)

    const serializedData = deserializedData
      .map(serialize)
  })

  describe('normalize', () => {
    test('10', () => {
      expect(normalize('10')).toEqual({
        significand: '1',
        exponent: '1',
      });
    })

    test('100', () => {
      expect(normalize('100')).toEqual({
        significand: '1',
        exponent: '2',
      });
    })

    test('101', () => {
      expect(normalize('101')).toEqual({
        significand: '101',
        exponent: '0',
      });
    })

    test('101.00', () => {
      expect(normalize('101')).toEqual({
        significand: '101',
        exponent: '0',
      });
    })

    test('101.01', () => {
      expect(normalize('101.01')).toEqual({
        significand: '10101',
        exponent: '-2',
      });
    })

    test('1.1', () => {
      expect(normalize('1.1')).toEqual({
        significand: '11',
        exponent: '-1',
      });
    })

    test('0.1', () => {
      expect(normalize('0.1')).toEqual({
        significand: '1',
        exponent: '-1',
      });
    })


  })

  // describe('deserialize', () => {



  // })


})
