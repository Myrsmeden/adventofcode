const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const startingNumbers = input.split(',').map((num) => parseInt(num));

const hasBeenSpoken = (number, turns) => Object.values(turns).find((num) => num === number);
const getTurnsSpoken = (number, turns) =>
  Object.entries(turns).reduce((acc, [turn, num]) => {
    if (num === number) {
      return [...acc, parseInt(turn)];
    }

    return acc;
  }, []);

const getTurnsSpoken2 = (number, turns, currentTurn) => {
  const turnsSpoken = [];
  for (let i = currentTurn; i >= 0; i--) {
    if (turns[i] === number) {
      turnsSpoken.push(i);
    }

    if (turnsSpoken.length >= 2) {
      return turnsSpoken;
    }
  }

  return []
};
const part1 = () => {
  const turns = {};
  let lastSpoken = -1;
  for (let i = 1; i <= 2020; i++) {
    if (i <= startingNumbers.length) {
      turns[i] = startingNumbers[i - 1];
      lastSpoken = turns[i];
    } else {
      const turnsSpoken = getTurnsSpoken(lastSpoken, turns);

      if (hasBeenSpoken(lastSpoken, turns) < 0 || turnsSpoken.length === 1) {
        turns[i] = 0;
        lastSpoken = 0;
      } else {
        const numberToSay = turnsSpoken[turnsSpoken.length - 1] - (turnsSpoken[turnsSpoken.length - 2] || 0);
        turns[i] = numberToSay;
        lastSpoken = numberToSay;
      }
    }
  }

  return lastSpoken;
};

// console.log(part1());

const part2 = () => {
  const numbersToTurns = {};
  let lastSpoken = -1;
  for (let i = 1; i <= 30000000; i++) {
    if (i <= startingNumbers.length) {
      let number = startingNumbers[i - 1]
      numbersToTurns[number] = i
      lastSpoken = number
    } else {
      const lastTurnSpoken = numbersToTurns[lastSpoken]
      
      if (!lastTurnSpoken) {
        numbersToTurns[lastSpoken] = i - 1
        lastSpoken = 0;
      } else {
        const saying = i - 1 - numbersToTurns[lastSpoken]
        numbersToTurns[lastSpoken] = i - 1
        lastSpoken = saying
      }
    }
  }

  return lastSpoken;
};
console.log(part2());
