const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

let grid = input.split('\n').map((line) => line.split('').map((d) => parseInt(d)));

const hasFlashed = (flashed, row, col) => flashed.some((item) => item.row === row && item.col === col);

const getAdjecentCoords = (row, col, updated) => {
  const max = updated.length;
  return [
    { row: row - 1, col: col - 1 },
    { row: row - 1, col },
    { row: row - 1, col: col + 1 },
    { row: row, col: col - 1 },
    { row: row, col: col + 1 },
    { row: row + 1, col: col - 1 },
    { row: row + 1, col },
    { row: row + 1, col: col + 1 },
  ].filter((item) => item.row >= 0 && item.row < max && item.col >= 0 && item.col < max);
};
const step = (grid) => {
  const updated = grid.map((row) => row.map((item) => item + 1));

  const flashed = [];

  do {
    newFlash = false;
    for (let row = 0; row < updated.length; row++) {
      for (let col = 0; col < updated[0].length; col++) {
        if (updated[row][col] > 9 && !hasFlashed(flashed, row, col)) {
          const adjecentCoords = getAdjecentCoords(row, col, updated);
          adjecentCoords.forEach((item) => {
            updated[item.row][item.col] += 1;
          });
          flashed.push({ row, col });
          newFlash = true;
        }
      }
    }
  } while (newFlash);

  return updated;
};

let flashes = 0;

for (let i = 0; i < 1000; i++) {
  grid = step(grid);
  grid = grid.map((row) =>
    row.map((col) => {
      if (col > 9) {
        flashes += 1;
        return 0;
      }
      return col;
    }),
  );
  if (
    grid.reduce((acc, row) => [...acc, ...row], []).filter((item) => item === 0).length ===
    grid.length * grid.length
  ) {
    console.log('Sim flash!', i + 1);
    if (i > 99) {
      break;
    }
  }

  if (i === 99) {
    console.log('Flashes after 100', flashes);
  }
}
