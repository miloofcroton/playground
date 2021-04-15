import { Decimal } from 'decimal.js';
import 'fast-text-encoding';
import { off } from 'node:process';


/*
Terms:

floating point number = number expressed similarly to scientific notation
significand = significant digits
exponent = exponent
base = number base

123.45 = 12345 × 10^2.
floating point number = significand × base ^ exponent

*/

const { log } = console;

Decimal.set({
  precision: 200,
  rounding: 0
})

const zero = new Decimal(0);
const one = new Decimal(1);
const ten = new Decimal(10);
const _256 = new Decimal(2**8);

type SerializedNumber = string;

type DeserializedNumber = {
  significand: Uint8Array,
  exponent: number,
}

const deserialize = ({
  significand,
  exponent,
}: DeserializedNumber): SerializedNumber => {
  const fullSignificand = significand
    .reduce((acc, curr, i) => {
      return acc
        .mul(_256)
        .add(new Decimal(curr))
    }, zero)

  65535

  const magnitude = ten.pow(exponent);

  return fullSignificand
    .mul(magnitude)
    .toString();
}

/** Undoes what deserialize does */
const serialize = (
  value: SerializedNumber
): DeserializedNumber => {
  // log(value, 'value');
  // find exponent if decimal '.'
  // find exponent if trailing zeros and no decimal.
  // revert back to uintarray

  let resultsArr = [];
  let decimal = new Decimal(value);
  let exponent = 0;

  while(decimal.comparedTo(zero) > 0) {
    let modulus = decimal.mod(_256);
    let modulusNum = new Number(modulus.toString());

    resultsArr.push(modulusNum);
    decimal = decimal
      .sub(modulus)
      .div(_256);
  }

  const temp = resultsArr.reverse();
  const tempArray = new Uint8Array(temp);

  return {
    significand: tempArray,
    exponent: exponent,
  };
}

export const normalizeNumber = (value: string): DeserializedNumber  => {
  const splitted = value.split('.');

  // if splitted[1]:
  // check if parseInt(splitted[1]) > 0


  return {
    significand: new Uint8Array([0]),
    exponent: 0,
  };
}

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


// log(origData[0])
// log(deserializedData[0])
// log(serializedData[0])
// log(origData[1])
// log(deserializedData[1])
// log(serializedData[1])

// origData.map((el, i) => {
//   log(origData[i])
//   log(deserializedData[i])
//   log(serializedData[i])
// })
// log(
//   origData,
//   deserializedData,
//   // serializedData,
// )
