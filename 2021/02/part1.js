const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const instructions = input.split('\n').map((input) => {
  const [instruction, distance] = input.split(' ');
  return [instruction, parseInt(distance)];
});

const { horisontal, depth } = instructions.reduce(
  (acc, [instruction, distance]) => {
    if (instruction === 'forward') {
      acc.horisontal += distance;
    } else if (instruction === 'down') {
      acc.depth += distance;
    } else if (instruction === 'up') {
      acc.depth -= distance;
    }

    return acc;
  },
  { horisontal: 0, depth: 0 },
);

console.log(horisontal * depth);
