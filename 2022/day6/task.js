const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

const chars = input.split('');

let result = -1;

const findSequence = (chars, length) => {
  for (let i = length; i < chars.length; i++) {
    const lastFour = new Set(chars.slice(i - length, i));
    if (lastFour.size === length) {
      return i;
    }
  }
};

console.log(findSequence(chars, 4));
console.log(findSequence(chars, 14));
