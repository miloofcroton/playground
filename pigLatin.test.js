import { translate } from './pigLatin'

describe('pig latin translator', () => {
  test('translate hello', () => {
    expect(translate('hello')).toBe('ellohay');
  })
  test('translate hello world', () => {
    expect(translate('hello world')).toBe('ellohay orldway');
  })
  test('retains capital letters', () => {
    expect(translate('Hello World')).toBe('Ellohay Orldway');
  })
  test('retains punctuation', () => {
    expect(translate('How are you?')).toBe('Owhay areway ouyay?');
  })
  test('retains internal punctuation', () => {
    expect(translate('Pizza? Yes Please!!')).toBe('Izzapay? Esyay Easeplay!!');
  })

})
