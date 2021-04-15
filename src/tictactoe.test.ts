import { solveTTT } from './tictactoe';

xdescribe('tictactoe', () => {
  test('a', () => {
    const b = ['O', '', '', 'O', 'X', '', 'X', 'O', 'X'];
    expect(solveTTT(b.slice())).toEqual(2);
  });
  test('b', () => {
    const b = ['', '', '', 'O', '', '', 'X', '', ''];
    expect([0,1,2,4,5,7,8].indexOf(solveTTT(b.slice())) != -1).toBeTruthy();
  });
  test('c', () => {
    const b = ['X', 'X', 'O', 'O', 'X', '', '', '', ''];
    expect([7,8].indexOf(solveTTT(b.slice())) != -1).toBeTruthy();
  });
  test('d', () => {
    const b = ['', 'O', 'O', 'O', 'O', '', 'X', 'X', ''];
    expect(solveTTT(b.slice())).toEqual(8);
  });
  test('e', () => {
    const b = ['', 'X', 'O', 'O', '', 'O', 'X', 'X', ''];
    expect([4,8].indexOf(solveTTT(b.slice())) != -1).toBeTruthy();
  });
  test('f', () => {
    const b = ['X', 'O', '', 'O', 'X', '', 'X', 'O', ''];
    expect([2,8].indexOf(solveTTT(b.slice())) != -1).toBeTruthy();
  });
});
