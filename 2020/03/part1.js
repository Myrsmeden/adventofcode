const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

const mapRows = input.split("\n");

const DX = 3;
const DY = 1;
const rowLength = mapRows[0].length

let x = 0;

let treeCount = 0
for (let y = 0; y < mapRows.length; y+= DY) {
  if (x >= rowLength) {
    x -= rowLength
  }

  if (mapRows[y][x] === '#') {
    treeCount++
  }

  x += DX
}

console.log(treeCount);
