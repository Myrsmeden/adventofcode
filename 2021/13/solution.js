const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const [dots, folds] = input.split('\n\n').map((part) => part.split('\n'));
console.log({ dots, folds });

const paper = dots.reduce((acc, dot) => {
  acc[dot] = '#';
  return acc;
}, {});

const folded = folds.reduce((acc, fold) => {
  const [axis, coordinate] = fold.replace('fold along ', '').split('=');
  console.log({ axis, coordinate });
  const coordNum = parseInt(coordinate);
  if (axis === 'y') {
    return Object.keys(
      acc.reduce((pap, dot) => {
        const [x, y] = dot.split(',').map((i) => parseInt(i));
        const newY = y > coordNum ? 2 * coordNum - y : y;
        pap[`${x},${newY}`] = '#';
        return pap;
      }, {}),
    );
  }

  return Object.keys(
    acc.reduce((pap, dot) => {
      const [x, y] = dot.split(',').map((i) => parseInt(i));
      const newX = x > coordNum ? 2 * coordNum - x : x;
      pap[`${newX},${y}`] = '#';
      return pap;
    }, {}),
  );
}, Object.keys(paper));
const { maxX, maxY } = folded.reduce(
  (acc, item) => {
    const [x, y] = item.split(',');
    return {
      maxY: Math.max(acc.maxY, parseInt(y)),
      maxX: Math.max(acc.maxX, parseInt(x)),
    };
  },
  { maxX: 0, maxY: 0 },
);
console.log(folded)
for (let y = 0; y <= maxY; y++) {
  for (let x = 0; x <= maxX; x++) {
    process.stdout.write(folded.includes(`${x},${y}`) ? '#' : ',');
  }
  process.stdout.write('\n');
}

