const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

const grid = input.split('\n').map((row) => row.split('').map((i) => parseInt(i)));

const isVisible = (value, row, col) => {
  if (row === 0 || col === 0) {
    return true;
  }

  if (row + 1 === grid.length || col + 1 === grid[0].length) {
    return true;
  }

  const neighbours = [[], [], [], []];

  for (let i = row + 1; i < grid.length; i++) {
    neighbours[0].push(grid[i][col]);
  }

  for (let i = row - 1; i >= 0; i--) {
    neighbours[1].push(grid[i][col]);
  }

  for (let i = col + 1; i < grid[0].length; i++) {
    neighbours[2].push(grid[row][i]);
  }

  for (let i = col - 1; i >= 0; i--) {
    neighbours[3].push(grid[row][i]);
  }

  const heighestNeighbours = neighbours.map((n) => Math.max(...n));

  if (Math.min(...heighestNeighbours) < value) {
    return true;
  }

  return false;
};

const getScenicScore = (value, row, col) => {
  const neighbours = [[], [], [], []];

  for (let i = row + 1; i < grid.length; i++) {
    neighbours[0].push(grid[i][col]);
    if (grid[i][col] >= value) {
      break;
    }
  }

  for (let i = row - 1; i >= 0; i--) {
    neighbours[1].push(grid[i][col]);
    if (grid[i][col] >= value) {
      break;
    }
  }

  for (let i = col + 1; i < grid[0].length; i++) {
    neighbours[2].push(grid[row][i]);
    if (grid[row][i] >= value) {
      break;
    }
  }

  for (let i = col - 1; i >= 0; i--) {
    neighbours[3].push(grid[row][i]);
    if (grid[row][i] >= value) {
      break;
    }
  }

  const score = neighbours.reduce((acc, list) => list.length * acc, 1);

  return score;
};

const visibleItems = grid.map((row, rowNr) => row.map((col, colNr) => isVisible(col, rowNr, colNr)));

const result = visibleItems.reduce((acc, row) => acc + row.reduce((acc2, item) => acc2 + (item ? 1 : 0), 0), 0);

const scores = grid.map((row, rowNr) => row.map((col, colNr) => getScenicScore(col, rowNr, colNr)));

const highestScore = Math.max(...scores.flat());
console.log({ highestScore });
