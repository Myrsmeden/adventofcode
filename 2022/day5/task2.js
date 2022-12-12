const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

const [initialConfiguration, instructions] = input.split('\n\n');

const stacks = {};

initialConfiguration
  .split('\n')
  .slice(0, -1)
  .forEach((line) => {
    let counter = 1;
    console.log(line.split(''));
    for (let i = 0; i < line.length; i += 4) {
      stacks[counter] = stacks[counter] || [];

      const char = line.charAt(i + 1).trim();

      if (char) {
        stacks[counter].push(char);
      }

      counter += 1;
    }
  });

console.log(stacks);
instructions.split('\n').forEach((inst) => {
  const [_move, amount, _from, start, _to, end] = inst.split(' ');

  const elements = stacks[start].slice(0, amount);
  console.log(elements);
  stacks[start] = stacks[start].slice(amount);
  stacks[end] = [...elements, ...stacks[end]];

  console.log(stacks);
});

const topElements = Object.values(stacks).map((line) => line[0]);

console.log(topElements.join(''));
