const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const illegalValues = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const pairs = {
  '(': ')',
  '{': '}',
  '[': ']',
  '<': '>',
};

const lines = input.split('\n');

const result = lines.reduce((acc, line) => {
  const stack = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (Object.keys(pairs).includes(char)) {
      stack.push(char);
    } else {
      const beginning = stack.pop();
      const ending = pairs[beginning]

      if (ending !== char) {
        return acc + illegalValues[char];
      }
    }
  }
  return acc;
}, 0);

console.log(result);
