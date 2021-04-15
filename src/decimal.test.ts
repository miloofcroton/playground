import {
  normalize,
  deserialize,
  serialize,
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
  let allMockData;

  beforeAll(() => {
    allMockData = createMockData(60);
  });

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

  describe('serialize', () => {
    test('serialize returns string number', () => {
      const mockData = createMockData(20);
      const deserializedData = mockData
        .map(serialize);

      deserializedData.map((el) => {
        expect(parseInt(el)).toEqual(expect.any(Number));
      });
    });
  });

  describe('deserialize', () => {

    test('can serialize then deserialize up to 10, including numbers less than 0.1', () => {
      const mockData = allMockData.slice(0,10);

      const serializedData = mockData
        .map(serialize)
        .map(deserialize);

      serializedData.map((el, i) => {
        expect(el).toEqual(mockData[i]);
      });
    });
    test('can serialize then deserialize index 17 of the mock data, including numbers with e', () => {
      const mockData = allMockData[17];

      const serializedData = [mockData]
        .map(serialize)
        .map(deserialize);

      expect(serializedData[0]).toEqual(mockData);
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
