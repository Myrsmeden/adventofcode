const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const lines = input
  .split('\n')
  .map((line) => line.split(' -> ').reduce((acc, element) => [...acc, ...element.split(',')], []));

const coordinates = lines.reduce((acc, line) => {
  const [x1, y1, x2, y2] = line;
  if (x1 !== x2 && y1 !== y2) {
    return acc;
  }

  if (x1 === x2) {
    const start = Math.min(y1, y2);
    const end = Math.max(y1, y2);
    for (let i = start; i <= end; i++) {
      const id = `${x1}:${i}`;
      const count = acc[id] || 0;
      acc[id] = count + 1;
    }
  }

  if (y1 === y2) {
    const start = Math.min(x1, x2);
    const end = Math.max(x1, x2);
    for (let i = start; i <= end; i++) {
      const id = `${i}:${y1}`;
      const count = acc[id] || 0;
      acc[id] = count + 1;
    }
  }

  return acc;
}, {});
console.log(Object.values(coordinates).filter((item) => item >= 2).length);
