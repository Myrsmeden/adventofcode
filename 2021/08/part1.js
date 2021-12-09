const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const numberToSegments = {
  1: 2,
  7: 3,
  4: 4,
  8: 7,
};

const lines = input.split('\n').map((item) => item.split('| ')[1]);
const result = lines.reduce((acc, line) => {
  return (
    acc +
    line.split(' ').filter((seq) => {
      return Object.values(numberToSegments).includes(seq.length);
    }).length
  );
}, 0);

console.log(result);
