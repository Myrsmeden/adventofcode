const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const positions = input.split(',').map((item) => parseInt(item));
const maxPosition = Math.max(...positions);

console.log(
  Math.min(
    ...Array.from({ length: maxPosition }).map((_item, target) => {
      return positions.reduce((sum, position) => sum + Math.abs(position - target), 0);
    }),
  ),
);
