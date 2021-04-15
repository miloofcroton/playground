import {
  normalize,
  serialize,
  deserialize,
  trimLeadingZeroes,
  DeserializedNumber,
} from './decimal'

// make this work for numbers larger than 14!
const emptyArray = Array(14).fill({})
const posArray: DeserializedNumber[] = emptyArray
  .map((el, i) => ({
    significand: new Uint8Array([255, 255]),
    exponent: i,
  }))
const negArray: DeserializedNumber[] = emptyArray
  .map((el, i) => ({
    significand: new Uint8Array([255, 255, 1]),
    exponent: i === 0 ? 0 : -i,
  }))

const mockData = [
  ...posArray,
  ...negArray,
]

describe('decimal', () => {

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


    test('0.01', () => {
      expect(normalize('0.01')).toEqual({
        significand: '1',
        exponent: '-2',
      });
    })


  })

  describe('deserialize', () => {
    test('deserialize returns string number', () => {
      const deserializedData = mockData
        .map(deserialize)

      deserializedData.map((el) => {
        expect(parseInt(el)).toEqual(expect.any(Number))
      })
    })
  })

  describe('serialize', () => {
    test('can deserialize then serialize', () => {
      const serializedData = mockData
        .map(deserialize)
        .map(serialize)

      serializedData.map((el, i) => {
        expect(el).toEqual(mockData[i])
      })
    })
  })

  describe('trimLeadingZeroes', () => {
    test('100', () => {
      expect(trimLeadingZeroes('100')).toEqual('100')
    })
    test('0100', () => {
      expect(trimLeadingZeroes('0100')).toEqual('100')
    })
  })
})
