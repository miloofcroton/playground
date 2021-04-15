const vowel = /[aeiouAEIOU]/g
const capital = /[A-Z]/g
const punctuation = /[^A-Za-z]/g

const getFirstChar = (word) => word.slice(0, 1)
const getAfterFirstChar = (word) => word.slice(1)
const getLastChar = (word) => word.slice(-1)
const getToVowel = (word, firstVowel) => word.slice(0, firstVowel)
const getAfterVowel = (word, firstVowel) => word.slice(firstVowel)
const getFirstVowel = (word) => word.toLowerCase().search(vowel)
const hasCapital = (word) => word.search(capital) !== -1
const hasVowel = (word) => word.search(vowel) !== -1
const hasFirstVowel = (word) => hasVowel(getFirstChar(word))
const getFirstPunctuation = (word) => word.search(punctuation)
const getAllPunctuation = (word) => word
  .split('')
  .map(char => char.search(punctuation) !== -1)
  .reduce((acc, curr, i) => {
    if (curr === true) {
      acc.push(i)
    }
    return acc
  }, [])


const addSuffix = (original, word) => {
  const ending = hasFirstVowel(original)
    ? 'way'
    : 'ay'

  return `${word}${ending}`
}

const reorderWord = (word) => {
  const firstVowel = getFirstVowel(word)
  const wordToVowel = getToVowel(word, firstVowel)
  const wordAfterVowel = getAfterVowel(word, firstVowel)

  return wordAfterVowel.concat(wordToVowel)
}

const capitalizeWord = (word) => {
  const firstChar = getFirstChar(word).toUpperCase()
  const restOfWord = getAfterFirstChar(word).toLowerCase()

  return firstChar.concat(restOfWord)
}

const translateWord = (word) => {
  const firstPunctuation = getFirstPunctuation(word)
  const hasPunctuation = firstPunctuation !== -1

  // world! -> world
  const withoutPunctuation = hasPunctuation
    ? word.slice(0, firstPunctuation)
    : word

  // world! -> !
  const ending = hasPunctuation
    ? word.slice(firstPunctuation)
    : ''

  // world -> orldw
  const reorderedWord = hasFirstVowel(word)
    ? withoutPunctuation
    : reorderWord(withoutPunctuation)

  // orldw -> orldway
  const withSuffix = addSuffix(word, reorderedWord)

  // orldway -> orldway!
  const withEnding = withSuffix.concat(ending)

  // orldway! -> Orldway!
  const withCapital = hasCapital(getFirstChar(word))
    ? capitalizeWord(withEnding)
    : withEnding

  return withCapital
}

export const translate = (phrase) => {

  return phrase
    .split(' ')
    .map(translateWord)
    .join(' ')
}
