const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const numbers = input.split('\n').map((num) => parseInt(num, 10));

const sums = numbers.map((current, index, original) => {
  if (index < 2) {
    return null;
  }

  return current + original[index - 1] + original[index - 2];
});

console.log({ sums });

const increasing = sums.map((current, index, original) => {
  console.log({ current, index, previous: original[index - 1] });
  return index > 2 ? current > original[index - 1] : null;
});

console.log({ increasing });

console.log(increasing.filter(Boolean).length);
