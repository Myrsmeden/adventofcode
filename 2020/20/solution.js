const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

class Tile {
  constructor(indata) {
    const [title, lines] = indata.split(':\n');
    const id = title.split(' ')[1];
    this.id = id;
    this.grid = lines.split('\n').map((line) => line.split(''));
  }
}
const tiles = input.split('\n\n').map((indata) => new Tile(indata));
const SIZE = Math.sqrt(tiles.length);

const flipHorizontal = (grid) => {
  return grid.map((line, y, originalGrid) => line.map((item, x) => originalGrid[line.length - y - 1][x]));
};

const flipVertical = (grid) => {
  return grid.map((line, y, originalGrid) => line.map((item, x) => originalGrid[y][line.length - x - 1]));
};

const rotate90 = (grid) => {
  return grid.map((line, y, originalGrid) => line.map((item, x) => originalGrid[line.length - 1 - x][y]));
};

const printGrid = (grid) => {
  grid.forEach((line) => {
    let acc = '';
    line.forEach((item) => {
      acc += item;
    });
    console.log(acc);
  });
};

const getMatching = (a, b) => {
  // Compare left side
  const isLeftMatching = a.reduce((matching, line, y) => {
    return matching && a[y][0] === b[y][line.length - 1];
  }, true);

  const isRightMatching = a.reduce((matching, line, y) => {
    return matching && a[y][line.length - 1] === b[y][0];
  }, true);

  const isTopMatching = a[0].reduce((matching, item, x) => {
    return matching && item === b[a.length - 1][x];
  }, true);

  const isBottomMatching = a[a.length - 1].reduce((matching, item, x) => {
    return matching && item === b[0][x];
  }, true);

  return { isLeftMatching, isRightMatching, isTopMatching, isBottomMatching };
};

const first = tiles[0];

const comparisons = tiles.slice(1).map((compare) => {
  const rotated90 = rotate90(compare.grid);
  const rotated180 = rotate90(rotated90);
  const rotated270 = rotate90(rotated180);
  const flippedH = flipHorizontal(compare.grid);
  const flippedV = flipVertical(compare.grid);
  const variants = [rotated90, rotated180, rotated270, flippedH, flippedV];
  const matches = variants.map((variant) => getMatching(first.grid, variant));
  return matches;
});

console.log(comparisons);
