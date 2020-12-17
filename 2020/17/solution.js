const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const grid = {};

input.split('\n').forEach((line, lineNumber) => {
  line.split('').forEach((value, columnumber) => {
    grid[`${columnumber}|${lineNumber}|0|0`] = value;
  });
});

const getNextValue = (key, value, grid) => {
  const [x, y, z] = key.split('|').map((val) => parseInt(val));

  const isActive = value === '#';

  const adjecent = [];
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        if (!(i === x && j === y && k === z)) {
          adjecent.push(grid[`${i}|${j}|${k}`] || '.');
        }
      }
    }
  }

  const adjecentActive = adjecent.filter((item) => item === '#');

  if (isActive && (adjecentActive.length === 2 || adjecentActive.length === 3)) {
    return '#';
  }

  if (!isActive && adjecentActive.length === 3) {
    return '#';
  }

  return '.';
};

const getNextValue2 = (key, value, grid) => {
  const [x, y, z, w] = key.split('|').map((val) => parseInt(val));

  const isActive = value === '#';

  const adjecent = [];
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        for (let l = w - 1; l <= w + 1; l++) {
          if (!(i === x && j === y && k === z && l === w)) {
            adjecent.push(grid[`${i}|${j}|${k}|${l}`] || '.');
          }
        }
      }
    }
  }

  const adjecentActive = adjecent.filter((item) => item === '#');

  if (isActive && (adjecentActive.length === 2 || adjecentActive.length === 3)) {
    return '#';
  }

  if (!isActive && adjecentActive.length === 3) {
    return '#';
  }

  return '.';
};

const cycle = (grid) => {
  return Object.entries(grid).reduce((newGrid, [key, value]) => {
    newGrid[key] = getNextValue(key, value, grid);
    return newGrid;
  }, {});
};

const cycle2 = (grid) => {
  return Object.entries(grid).reduce((newGrid, [key, value]) => {
    newGrid[key] = getNextValue2(key, value, grid);
    return newGrid;
  }, {});
};

const part1 = () => {
  const extendedGrid = {};

  const NUM_CYCLES = 6;
  const SIZE = input.split('\n').length + NUM_CYCLES;

  for (let i = -SIZE; i <= SIZE; i++) {
    for (let j = -SIZE; j <= SIZE; j++) {
      for (let k = -SIZE; k <= SIZE; k++) {
        extendedGrid[`${i}|${j}|${k}`] = grid[`${i}|${j}|${k}|0`] || '.';
      }
    }
  }

  const final = Array.from(Array(NUM_CYCLES).keys()).reduce((nextGrid, index) => {
    console.log('Cycle', index);
    return cycle(nextGrid);
  }, extendedGrid);

  return Object.values(final).filter((item) => item === '#').length;
};

console.log('Part1', part1());

const part2 = () => {
  const extendedGrid = {};

  const NUM_CYCLES = 6;
  const SIZE = Math.ceil(input.split('\n').length / 2) + NUM_CYCLES + 1;

  for (let i = -SIZE; i <= SIZE; i++) {
    for (let j = -SIZE; j <= SIZE; j++) {
      for (let k = -SIZE; k <= SIZE; k++) {
        for (let l = -SIZE; l <= SIZE; l++) {
          extendedGrid[`${i}|${j}|${k}|${l}`] = grid[`${i}|${j}|${k}|${l}`] || '.';
        }
      }
    }
  }

  const final = Array.from(Array(NUM_CYCLES).keys()).reduce((nextGrid, index) => {
    console.log('Cycle', index);
    return cycle2(nextGrid);
  }, extendedGrid);

  return Object.values(final).filter((item) => item === '#').length;
};

console.log('Part2', part2());
