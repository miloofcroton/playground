/* notes
- types of wins: vertical, horizontal, diagonal
- numerical options:
  - [0,1,2] [3,4,5] [6,7,8]
  - [0,3,6] [1,4,7] [2,5,8]
  - [0,4,8] [2,4,6]
- steps:
  - check for pending win
  - check for pending loss (if played perfectly, is this a concern?)
  - pick most strategic move
*/


const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
const getRandomArr = arr => arr.sort((a, b) => {
  const randInt = getRandomInt(1);
  if (randInt) return 1;
  else return -1;
});

const horizontalWins = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8]
];

const verticalWins = [
  [0, 3, 6], [1, 4, 7], [2, 5, 8]
];

const diagonalWins = [
  [0, 4, 8], [2, 4, 6]
];
const allWins = [
  ...horizontalWins,
  ...verticalWins,
  ...diagonalWins,
];

const positionHierarchy = [
  ...[4],
  ...getRandomArr([0, 2, 6, 8]),
  ...getRandomArr([1, 3, 5, 7])
];

const sides = ['X', 'O'];
const getOppSide = side => sides.find(el => el !== side);

const checkForWin = (status, side) => {
  const oppSide = getOppSide(side);
  const goodSide = status.filter(space => space === side);
  const badSide = status.filter(space => space === oppSide);
  if (goodSide.length === 2 && badSide.length === 0) return true;
  else return false;
};

// checks for 2 out of 3, and absence of a third piece
// board: string[]
// side: string
const checkForPending = (board, side) => {
  const winMap = allWins
    .map(winSeq => ({
      win: winSeq,
      status: [
        board[winSeq[0]], board[winSeq[1]], board[winSeq[2]]
      ]
    }));

  const hasWin = winMap.some(el => checkForWin(el.status, side));

  // return truthy, with a move
  if (hasWin) {
    const wins = winMap.filter(el => checkForWin(el.status, side));
    const randWinNum = getRandomInt(wins.length);
    const randWin = wins[randWinNum];

    const moveIndex = randWin.status.findIndex(el => el !== side);
    const move = randWin.win[moveIndex];

    return move;
  }
  else return false;
};

// returns index of move
export const solveTTT = (board) => {
  const potentialWin = checkForPending(board, 'X');
  if (potentialWin) return potentialWin;
  const potentialLoss = checkForPending(board, 'O');
  if (potentialLoss) return potentialLoss;

  const randMove = positionHierarchy.find(index => {
    if (!board[index]) return true;
    else return false;
  });
  return randMove;
};
