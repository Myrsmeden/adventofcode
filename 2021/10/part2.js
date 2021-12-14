const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const charScores = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
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
      const ending = pairs[beginning];

      if (ending !== char) {
        return acc;
      }
    }
  }
  return [
    ...acc,
    stack
      .map((item) => pairs[item])
      .reverse()
      .join(''),
  ];
}, []);

const scores = result.map((str) => str.split('').reduce((acc, item) => acc * 5 + charScores[item], 0));

const middle = scores.sort((a, b) => (a > b ? 1 : -1))[Math.floor(scores.length / 2)];
console.log(middle);
