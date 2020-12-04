const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

const mapRows = input.split("\n");

const rowLength = mapRows[0].length;
const slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const multipliedTreeCount = slopes.reduce((count, slope) => {
  const DX = slope.right;
  const DY = slope.down;

  let x = 0;

  let treeCount = 0;
  for (let y = 0; y < mapRows.length; y += DY) {
    if (x >= rowLength) {
      x -= rowLength;
    }

    if (mapRows[y][x] === "#") {
      treeCount++;
    }

    x += DX;
  }

  console.log(slope, treeCount)

  return count * treeCount;
}, 1);

console.log(multipliedTreeCount);
