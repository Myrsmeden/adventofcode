const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const startCups = input.split('').map((num) => parseInt(num));

const getDestination = (current, picked, maxCup) => {
  let destination = current - 1;
  while (picked.find((item) => item === destination) || destination === 0) {
    destination -= 1;

    if (destination <= 0) {
      destination = maxCup;
    }
  }

  return destination;
};

const move = (cups, maxCup) => {
  const current = cups[0];
  const picked = cups.splice(1, 3);
  const destinationCup = getDestination(current, picked, maxCup);
  const destinationIndex = cups.findIndex((item) => item === destinationCup);
  cups.splice(destinationIndex + 1, 0, ...picked);
  return cups;
};

const part1 = () => {
  let cups = startCups;
  for (let i = 0; i < 100; i++) {
    cups = move(cups, 9);
    current = cups.shift();
    cups.push(current);
  }

  const firstIndex = cups.findIndex((item) => item === 1);
  return [...cups.slice(firstIndex + 1), ...cups.slice(0, firstIndex)].join('');

  return cups;
};

// console.log(part1());

const part2 = () => {
  const rest = [...Array(1000000 - 10).keys()].map((item) => item + 10);
  let cups = [...startCups, ...rest];
  console.log(cups.length);
  for (let i = 0; i < 10000000; i++) {
    //if (i % 10000 === 0) {
      console.log('Round', i);
    // }
    cups = move(cups, 1000000);
    current = cups.shift();
    cups.push(current);
  }

  const firstIndex = cups.findIndex((item) => item === 1);
  return [...cups.slice(firstIndex + 1), ...cups.slice(0, firstIndex)].join('');

  return cups;
};

console.log(part2());
