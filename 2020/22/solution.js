const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

let [deck1, deck2] = input.split('\n\n').map((player) =>
  player
    .split(':\n')[1]
    .split('\n')
    .map((num) => parseInt(num)),
);

const round = (deck1, deck2) => {
  const c1 = deck1.shift();
  const c2 = deck2.shift();

  const p1Wins = c1 > c2;
  if (p1Wins) {
    deck1.push(c1);
    deck1.push(c2);

    return [deck1, deck2];
  }

  deck2.push(c2);
  deck2.push(c1);

  return [deck1, deck2];
};
const calculateScore = (deck) => {
  return deck.reduce((acc, card, position, original) => {
    return acc + card * (original.length - position);
  }, 0);
};

const part1 = () => {
  while (deck1.length > 0 && deck2.length > 0) {
    [deck1, deck2] = round(deck1, deck2);
  }

  return calculateScore([...deck1, ...deck2]);
};

const previousDecks = {};

const playerHasIdentical = (previous, current) => {
  let identical = true;
  for (let i = 0; i < previous.length; i++) {
    identical = true;
    if (previous[i].length !== current.length) {
      continue;
    }
    for (let j = 0; j < current.length; j++) {
      if (previous[i][j] !== current[j]) {
        identical = false;
        break;
      }
    }

    if (identical) {
      return true;
    }
  }

  return false;
};

const hasHadIdenticalRound = (previousDecks, deck1, deck2) => {
  const p1Identical = playerHasIdentical(previousDecks.p1, deck1);
  const p2Identical = playerHasIdentical(previousDecks.p2, deck2);
  return p1Identical || p2Identical;
};

const round2 = (previousDecks, deck1, deck2) => {
  let [p1wins, p2wins] = [false, false];
  if (hasHadIdenticalRound(previousDecks, deck1, deck2)) {
    return [[1], []];
  }

  previousDecks.p1.push(JSON.parse(JSON.stringify(deck1)));
  previousDecks.p2.push(JSON.parse(JSON.stringify(deck2)));

  const c1 = deck1.shift();
  const c2 = deck2.shift();

  if (deck1.length >= c1 && deck2.length >= c2) {
    [new1, new2] = game2(deck1.slice(0, c1), deck2.slice(0, c2));
    p1wins = new2.length === 0;
    p2wins = new1.length === 0;
  } else {
    [p1wins, p2wins] = [c1 > c2, c2 > c1];
  }

  if (p1wins) {
    deck1.push(c1);
    deck1.push(c2);
  }

  if (p2wins) {
    deck2.push(c2);
    deck2.push(c1);
  }

  return [deck1, deck2];
};

let gamecount = 1;

const game2 = (deck1, deck2) => {
  gamecount += 1;
  const previousDecks = {
    p1: [],
    p2: [],
  };
  while (deck1.length > 0 && deck2.length > 0) {
    [deck1, deck2] = round2(previousDecks, deck1, deck2);
  }

  return [deck1, deck2];
};

const part2 = () => {
  const [finalDeck1, finalDeck2] = game2(deck1, deck2);
  return calculateScore([...finalDeck1, ...finalDeck2]);
};

console.log(part2());
