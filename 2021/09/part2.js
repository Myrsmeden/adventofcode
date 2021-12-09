const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const map = input.split('\n').map((item) => item.split('').map((num) => parseInt(num)));

const getNeighbours = (coordinates, row, column) => {
  return [
    row + 1 < coordinates.length
      ? { tile: coordinates[row + 1][column], rowNumber: row + 1, columnNumber: column }
      : undefined,
    row > 0 ? { tile: coordinates[row - 1][column], rowNumber: row - 1, columnNumber: column } : undefined,
    column + 1 < coordinates[0].length
      ? { tile: coordinates[row][column + 1], rowNumber: row, columnNumber: column + 1 }
      : undefined,
    column > 0 ? { tile: coordinates[row][column - 1], rowNumber: row, columnNumber: column - 1 } : undefined,
  ].filter((item) => item !== undefined);
};

const bottoms = map.reduce((collected, row, rowNumber, original) => {
  return [
    ...collected,
    ...row.reduce((acc, tile, columnNumber) => {
      const neighbours = getNeighbours(original, rowNumber, columnNumber);
      if (neighbours.filter((item) => tile < item.tile).length === neighbours.length) {
        acc.push({ tile, rowNumber, columnNumber });
        return acc;
      }

      return acc;
    }, []),
  ];
}, []);

const visited = [];

const getBasin = ({ tile, rowNumber, columnNumber }) => {
  if (tile === 9 || visited.some((item) => item.rowNumber === rowNumber && item.columnNumber === columnNumber)) {
    return [];
  }
  const n = getNeighbours(map, rowNumber, columnNumber);
  visited.push({ tile, rowNumber, columnNumber });
  return n.reduce(
    (acc, item) => {
      if (item.tile === 9) {
        return acc;
      }

      return [...acc, ...getBasin(item)];
    },
    [{ tile, rowNumber, columnNumber }],
  );
};

const result = bottoms
  .map(getBasin)
  .map((basin) => basin.length)
  .sort((a, b) => (a < b ? 1 : -1))
  .slice(0, 3)
  .reduce((acc, part) => acc * part, 1);

console.log(result);
