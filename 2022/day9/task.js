const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

const lines = input.split('\n');

const positions = [];

let head = [0, 0];

let tail = [0, 0];

const isAdjacent = (head, tail) => {
  return !(Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1);
};

const updateTail = (head, tail) => {
  const newTail = [tail[0], tail[1]];
  if (head[0] !== tail[0] && head[1] === tail[1]) {
    newTail[0] += head[0] > tail[0] ? 1 : -1;
  } else if (head[1] !== tail[1] && head[0] === tail[0]) {
    newTail[1] += head[1] > tail[1] ? 1 : -1;
  } else {
    newTail[0] += head[0] > tail[0] ? 1 : -1;
    newTail[1] += head[1] > tail[1] ? 1 : -1;
  }

  return newTail;
};

lines.forEach((line) => {
  const [direction, times] = line.split(' ');
  for (let i = 0; i < parseInt(times); i++) {
    if (direction === 'R') {
      head[0] += 1;
    }
    if (direction === 'L') {
      head[0] -= 1;
    }
    if (direction === 'U') {
      head[1] += 1;
    }
    if (direction === 'D') {
      head[1] -= 1;
    }

    if (!isAdjacent(head, tail)) {
      positions.push(tail);
      tail = updateTail(head, tail);
    }
  }
});

const calculateUniqueness = positions.map((position) => position[0] * 1000000 + position[1] * 1000000000);

console.log(new Set(calculateUniqueness).size);
