const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const grid = input.split('\n').map((row) => row.split(''));

const getSeat = (rowY, colX, grid) => {
  try {
    return grid[rowY][colX];
  } catch (e) {
    return 'L';
  }
};

const getNextSeat = (current, row, column, old) => {
  let adjecent = [];
  for (let i = column - 1; i <= column + 1; i++) {
    for (let j = row - 1; j <= row + 1; j++) {
      if (!(i === column && j === row)) {
        adjecent.push(getSeat(j, i, old));
      }
    }
  }

  const numberOfOccupied = adjecent.filter((item) => item === '#').length;

  if (current === 'L' && numberOfOccupied === 0) {
    return '#';
  }

  if (current === '#' && numberOfOccupied >= 4) {
    return 'L';
  }
  return current;
};

const findSeatWithStatus = (startRow, startCol, directionX, directionY, grid) => {
  const newY = startRow + directionY;
  const newX = startCol + directionX;
  try {
    const status = getSeat(newY, newX, grid);
    if (status !== '.') {
      return status;
    }

    return findSeatWithStatus(newY, newX, directionX, directionY, grid);
  } catch (e) {
    return '.';
  }
};


const getNextSeat2 = (current, row, column, old) => {
  const adjecent = [
    findSeatWithStatus(row, column, -1, -1, old),
    findSeatWithStatus(row, column, 0, -1, old),
    findSeatWithStatus(row, column, 1, -1, old),
    findSeatWithStatus(row, column, -1, 0, old),
    '0',
    findSeatWithStatus(row, column, 1, 0, old),
    findSeatWithStatus(row, column, -1, 1, old),
    findSeatWithStatus(row, column, 0, 1, old),
    findSeatWithStatus(row, column, 1, 1, old),
  ];


  const numberOfOccupied = adjecent.filter((item) => item === '#').length;

  if (current === 'L' && numberOfOccupied === 0) {
    return '#';
  }

  if (current === '#' && numberOfOccupied >= 5) {
    return 'L';
  }
  return current;
};

const compareArray = (a1, a2) => {
  if (a1.length != a2.length) {
    return false;
  }
  for (var i in a1) {
    // Don't forget to check for arrays in our arrays.
    if (a1[i] instanceof Array && a2[i] instanceof Array) {
      if (!compareArray(a1[i], a2[i])) {
        return false;
      }
    } else if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
};

const nextState = (oldGrid) => {
  return oldGrid.map((row, rowId) => row.map((item, columnId) => getNextSeat(item, rowId, columnId, oldGrid)));
};

const nextState2 = (oldGrid) => {
  return oldGrid.map((row, rowId) => row.map((item, columnId) => getNextSeat2(item, rowId, columnId, oldGrid)));
};

const part1 = (previousGrid) => {
  let next = nextState(previousGrid);

  let count = 0;
  while (!compareArray(next, previousGrid)) {
    previousGrid = JSON.parse(JSON.stringify(next));
    next = nextState(previousGrid);
    count += 1;
  }
  console.log(count);
  console.log(next.reduce((count, row) => count + row.reduce((count, item) => count + (item === '#' ? 1 : 0), 0), 0));
};

//part1(grid);

const part2 = (previousGrid) => {
  let next = nextState2(previousGrid);

  let count = 0;
  while (!compareArray(next, previousGrid)) {
    previousGrid = JSON.parse(JSON.stringify(next));
    next = nextState2(previousGrid);
    count += 1;
  }
  console.log(count);
  console.log(next.reduce((count, row) => count + row.reduce((count, item) => count + (item === '#' ? 1 : 0), 0), 0));
};

part2(grid);
