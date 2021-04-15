import {
  normalize,
  serialize,
  deserialize,
  trimLeadingZeroes,
  DeserializedNumber,
} from './decimal';

const createArr = (length) => Array(length).fill({});

const createPos = (el, i): DeserializedNumber => ({
  significand: new Uint8Array([255, 255]),
  exponent: i,
});

const createNeg = (el, i): DeserializedNumber => ({
  significand: new Uint8Array([255, 255]),
  exponent: i === 0 ? 0 : -i,
});

const createMockData = (length) => [
  ...createArr(length).map(createPos),
  ...createArr(length).map(createNeg),
];

describe('decimal', () => {

  describe('normalize', () => {
    test('10', () => {
      expect(normalize('10')).toEqual({
        significand: '1',
        exponent: '1',
      });
    });

    test('100', () => {
      expect(normalize('100')).toEqual({
        significand: '1',
        exponent: '2',
      });
    });

    test('101', () => {
      expect(normalize('101')).toEqual({
        significand: '101',
        exponent: '0',
      });
    });

    test('101.00', () => {
      expect(normalize('101')).toEqual({
        significand: '101',
        exponent: '0',
      });
    });

    test('101.01', () => {
      expect(normalize('101.01')).toEqual({
        significand: '10101',
        exponent: '-2',
      });
    });

    test('1.1', () => {
      expect(normalize('1.1')).toEqual({
        significand: '11',
        exponent: '-1',
      });
    });

    test('0.1', () => {
      expect(normalize('0.1')).toEqual({
        significand: '1',
        exponent: '-1',
      });
    });


    test('0.01', () => {
      expect(normalize('0.01')).toEqual({
        significand: '1',
        exponent: '-2',
      });
    });


  });

  describe('deserialize', () => {
    test('deserialize returns string number', () => {
      const mockData = createMockData(20);
      const deserializedData = mockData
        .map(deserialize);

      deserializedData.map((el) => {
        expect(parseInt(el)).toEqual(expect.any(Number));
      });
    });
  });

  describe('serialize', () => {
    test('can deserialize then serialize up to 10, including numbers less than 0.1', () => {
      const mockData = createMockData(10);

      const serializedData = mockData
        .map(deserialize)
        .map(serialize);

      serializedData.map((el, i) => {
        expect(el).toEqual(mockData[i]);
      });
    });
    test('can deserialize then serialize index 17 of the mock data', () => {
      const mockData = createMockData(20);

      const serializedData = [mockData[17]]
        .map(deserialize)
        .map(serialize);

      expect(serializedData[0]).toEqual(mockData[17]);
    });
  });

  describe('trimLeadingZeroes', () => {
    test('100', () => {
      expect(trimLeadingZeroes('100')).toEqual('100');
    });
    test('0100', () => {
      expect(trimLeadingZeroes('0100')).toEqual('100');
    });
  });
});
