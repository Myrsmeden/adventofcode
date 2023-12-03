const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

const grid = input.split('\n').map((line) => line.split(''));

const partOne = () => {
  let sum = 0;
  let gearSum = 0;
  const gears = {};

  const gearHelper = (r, c, n) => {
    gears[`${r}|${c}`] = gears[`${r}|${c}`] || [];
    gears[`${r}|${c}`].push(n);
  };
  grid.forEach((row, rowNumber) => {
    let numberStart = null;
    for (let i = 0; i < row.length; i++) {
      const char = row[i];

      if (!isNaN(parseInt(char))) {
        if (numberStart === null) {
          numberStart = i;
        }
      }
      if ((numberStart !== null && isNaN(parseInt(char))) || (numberStart !== null && i === row.length - 1)) {
        const number = parseInt(row.slice(numberStart, i + 1).join(''));
        const adjacentChars = [];

        if (numberStart > 0) {
          adjacentChars.push(row[numberStart - 1]);

          if (row[numberStart - 1] === '*') {
            gearHelper(rowNumber, numberStart - 1, number);
          }

          if (rowNumber > 0) {
            adjacentChars.push(grid[rowNumber - 1][numberStart - 1]);

            if (grid[rowNumber - 1][numberStart - 1] === '*') {
              gearHelper(rowNumber - 1, numberStart - 1, number);
            }
          }

          if (rowNumber < grid.length - 1) {
            adjacentChars.push(grid[rowNumber + 1][numberStart - 1]);

            if (grid[rowNumber + 1][numberStart - 1] === '*') {
              gearHelper(rowNumber + 1, numberStart - 1, number);
            }
          }
        }

        if (i !== row.length - 1) {
          adjacentChars.push(row[i]);

          if (row[i] === '*') {
            gearHelper(rowNumber, i, number);
          }
          if (rowNumber > 0) {
            adjacentChars.push(grid[rowNumber - 1][i]);

            if (grid[rowNumber - 1][i] === '*') {
              gearHelper(rowNumber - 1, i, number);
            }
          }

          if (rowNumber < grid.length - 1) {
            adjacentChars.push(grid[rowNumber + 1][i]);

            if (grid[rowNumber + 1][i] === '*') {
              gearHelper(rowNumber + 1, i, number);
            }
          }
        }

        if (rowNumber > 0) {
          const adjs = grid[rowNumber - 1].slice(numberStart, i);
          const gearIndex = adjs.findIndex((i) => i === '*');

          if (gearIndex > -1) {
            gearHelper(rowNumber - 1, numberStart + gearIndex, number);
          }
          adjacentChars.push(...adjs);
        }

        if (rowNumber < grid.length - 1) {
          const adjs = grid[rowNumber + 1].slice(numberStart, i);
          const gearIndex = adjs.findIndex((i) => i === '*');

          if (gearIndex > -1) {
            gearHelper(rowNumber + 1, numberStart + gearIndex, number);
          }
          adjacentChars.push(...adjs);
        }

        const nonDots = adjacentChars.filter((i) => i !== '.');

        if (nonDots.length > 0) {
          sum += number;
        }

        numberStart = null;
      }
    }
  });

  console.log(sum);

  console.log(
    Object.values(gears)
      .filter((list) => list.length === 2)
      .map((l) => l[0] * l[1])
      .reduce((s, v) => s + v),
  );
};

partOne();
