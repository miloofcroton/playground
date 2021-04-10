const VOWELS = [
  'a',
  'e',
  'i',
  'o',
  'u',
]

const suffixAdder = (word) => `${word}ay`

const pigLatinTranslater = (phrase) => {
  const words = phrase.split(' ')
  return words.map(word => {
    const firstVowel = word
      .split('')
      .findIndex(char => VOWELS.some(vowel => vowel === char))

    const firstChar = word
      .slice(0,1)
    const cappedFirst = firstChar
      .toUpperCase();
    const isCapped = cappedFirst === firstChar;

    const fixCap = (word) => {
      const cappedStart = word
        .slice(0, 1)
        .toUpperCase()
        .concat(word.slice(1).toLowerCase())

      return cappedStart;
    }

    const rawWord = word
      .slice(firstVowel)
      .concat(word.slice(0, firstVowel))

    return isCapped
      ? fixCap(rawWord)
      : rawWord;

  })
  .map(suffixAdder)
  .join(' ')
}


console.log(pigLatinTranslater('Hello world'))
