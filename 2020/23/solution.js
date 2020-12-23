const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const startCups = input.split('').map((num) => parseInt(num));

const getDestination = (current, cups) => {
  let destination = current - 1;
  while (!cups.find((item) => item === destination)) {
    destination -= 1;

    if (destination <= 0) {
      return Math.max(...cups);
    }
  }

  return destination;
};

const move = (cups) => {
  const current = cups[0];
  const picked = cups.splice(1, 3);
  const destinationCup = getDestination(current, cups.slice(1));
  const destinationIndex = cups.findIndex((item) => item === destinationCup);
  cups.splice(destinationIndex + 1, 0, ...picked);
  return cups;
};

const part1 = () => {
  let cups = startCups
  for (let i = 0; i < 100; i++) {
    cups = move(cups);
    current = cups.shift();
    cups.push(current);
  }

  const firstIndex = cups.findIndex((item) => item === 1);
  return [...cups.slice(firstIndex + 1), ...cups.slice(0, firstIndex)].join('');

  return cups;
};

// console.log(part1());


const part2 = () => {
  const rest = [...Array(1000000 - 10).keys()].map(item => item + 10)
  let cups = [...startCups, ...rest];
  console.log(cups.length)
  for (let i = 0; i < 10000000; i++) {
    if (i % 10000 === 0) {
      console.log('Round', i)
    }
    cups = move(cups);
    current = cups.shift();
    cups.push(current);
  }

  const firstIndex = cups.findIndex((item) => item === 1);
  return [...cups.slice(firstIndex + 1), ...cups.slice(0, firstIndex)].join('');

  return cups;
};

console.log(part2());
