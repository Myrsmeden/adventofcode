const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const [draw, ...boardData] = input.split('\n\n');

const boards = boardData.map((board) =>
  board
    .split('\n')
    .map((input) => input.trim().replace(/\s+/g, ' '))
    .join(' ')
    .split(' ')
    .map((input) => parseInt(input)),
);

const drawNumber = (boards, number) => boards.map((board) => board.map((entry) => (entry === number ? -1 : entry)));
const hasWon = (board) => {
  for (let i = 0; i < 5; i++) {
    if (
      board[i * 5] === -1 &&
      board[i * 5 + 1] === -1 &&
      board[i * 5 + 2] === -1 &&
      board[i * 5 + 3] === -1 &&
      board[i * 5 + 4] === -1
    ) {
      return true;
    }

    if (
      board[i] === -1 &&
      board[i + 5] === -1 &&
      board[i + 10] === -1 &&
      board[i + 15] === -1 &&
      board[i + 20] === -1
    ) {
      return true;
    }
  }

  return false;
};

let nextBoards = boards;
let boardWins = [];
draw
  .split(',')
  .map((number) => parseInt(number))
  .forEach((number) => {
    nextBoards = drawNumber(nextBoards, number);
    nextBoards.forEach((board, boardIndex) => {
      if (!boardWins.includes(boardIndex) && hasWon(board)) {
        boardWins.push(boardIndex);

        if (boardWins.length === boards.length) {
          const sum = board.filter((number) => number !== -1).reduce((acc, number) => acc + number, 0);
          console.log(sum * number);
        }
      }
    });
  });
