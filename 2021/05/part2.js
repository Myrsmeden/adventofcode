const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const lines = input
  .split('\n')
  .map((line) =>
    line.split(' -> ').reduce((acc, element) => [...acc, ...element.split(',')].map((item) => parseInt(item)), []),
  );
const coordinates = lines.reduce((acc, line) => {
  const [x1, y1, x2, y2] = line;

  if (x1 === x2) {
    const start = Math.min(y1, y2);
    const end = Math.max(y1, y2);
    for (let i = start; i <= end; i++) {
      const id = `${x1}:${i}`;
      const count = acc[id] || 0;
      acc[id] = count + 1;
    }
  } else if (y1 === y2) {
    const start = Math.min(x1, x2);
    const end = Math.max(x1, x2);
    for (let i = start; i <= end; i++) {
      const id = `${i}:${y1}`;
      const count = acc[id] || 0;
      acc[id] = count + 1;
    }
  } else {
    const startY = y1;
    const startX = x1;
    let x = startX;
    let y = startY;
    let run = true;
    let runOneMoreTime = false;
    while (run) {
      const id = `${x}:${y}`;
      const count = acc[id] || 0;
      acc[id] = count + 1;

      x = x1 < x2 ? x + 1 : x - 1;
      y = y1 < y2 ? y + 1 : y - 1;

      if (runOneMoreTime) {
        run = false;
      }

      if (x === x2 || y === y2) {
        runOneMoreTime = true;
      }
    }
  }

  return acc;
}, {});
console.log(Object.values(coordinates).filter((item) => item >= 2).length);
