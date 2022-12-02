const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

const rounds = input.split('\n').map((line) => line.split(' '));

const opponentMap = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSOR',
};

const playerMap = {
  X: 'ROCK',
  Y: 'PAPER',
  Z: 'SCISSOR',
};

const outcome = ([o, p]) => {
  const opponent = opponentMap[o];
  const player = playerMap[p];
  if (opponent === player) {
    return 0;
  }

  if (opponent === 'ROCK' && player === 'SCISSOR') {
    return -1;
  }

  if (player === 'ROCK' && opponent === 'SCISSOR') {
    return 1;
  }

  if (opponent === 'SCISSOR' && player === 'PAPER') {
    return -1;
  }

  if (player === 'SCISSOR' && opponent === 'PAPER') {
    return 1;
  }

  if (opponent === 'PAPER' && player === 'ROCK') {
    return -1;
  }

  if (player === 'PAPER' && opponent === 'ROCK') {
    return 1;
  }
};

const getWantedScore = (status) => {
  switch (status) {
    case 'X':
      return -1;
    case 'Y':
      return 0;
    case 'Z':
      return 1;
  }
};
const wantedOutcome = ([o, w]) => {
  const wantedScore = getWantedScore(w);

  const possiblePlays = ['X', 'Y', 'Z'];
  for (let i = 0; i < possiblePlays.length; i++) {
    const play = possiblePlays[i];
    if (outcome([o, play]) === wantedScore) {
      return [outcomeScore([o, play]), play];
    }
  }
};

const outcomeScore = ([p1, p2]) => {
  const o = outcome([p1, p2]);
  return (o + 1) * 3;
};

const shapeScore = (shape) => {
  switch (shape) {
    case 'X':
      return 1;
    case 'Y':
      return 2;
    case 'Z':
      return 3;
  }
};

const scores1 = rounds.map((line) => outcomeScore(line) + shapeScore(line[1]));
const sum1 = scores1.reduce((acc, item) => acc + item, 0);

console.log(sum1);

const scores2 = rounds.map((line) => {
  const [score, shape] = wantedOutcome(line);
  return score + shapeScore(shape);
});

const sum2 = scores2.reduce((acc, item) => acc + item, 0);

console.log(sum2);
