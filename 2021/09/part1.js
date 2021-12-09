const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const map = input.split('\n').map((item) => item.split('').map((num) => parseInt(num)));

const getNeighbours = (coordinates, row, column) => {
  return [
    row + 1 < coordinates.length ? coordinates[row + 1][column] : undefined,
    row > 0 ? coordinates[row - 1][column] : undefined,
    column + 1 < coordinates[0].length ? coordinates[row][column + 1] : undefined,
    column > 0 ? coordinates[row][column - 1] : undefined,
  ].filter(item => item !== undefined);
};

const result = map.reduce((sum, row, rowNumber, original) => {
  return (
    sum +
    row.reduce((acc, tile, columnNumber) => {
      const neighbours = getNeighbours(original, rowNumber, columnNumber);
      if (neighbours.filter((item) => tile < item).length === neighbours.length) {
        return acc + tile + 1;
      }

      return acc;
    }, 0)
  );
}, 0);

console.log(result);
