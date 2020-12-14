const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const [arrivalTimeString, IDs] = input.split('\n');
const arrivalTime = parseInt(arrivalTimeString);
const busIDs = IDs.split(',')
  .filter((item) => item !== 'x')
  .map((item) => parseInt(item));

const part1 = () => {
  for (let i = 0; i < arrivalTime; i++) {
    for (let j = 0; j < busIDs.length; j++) {
      if ((arrivalTime + i) % busIDs[j] === 0) {
        return busIDs[j] * i;
      }
    }
  }
};

console.log(part1());

const moduloInverse = (a, m) => {
  let m0 = m,
    t,
    q;
  let x0 = 0n,
    x1 = 1n;

  if (m === 1) return 1n;

  while (a > 1) {
    q = a / m;
    t = m;
    m = a % m;
    a = t;
    t = x0;
    x0 = x1 - q * x0;
    x1 = t;
  }
  if (x1 < 0) x1 += m0;

  return x1;
};

const cheneseReminder = (numbers, reminders, k) => {
  let prod = 1n;
  for (let i = 0; i < k; i++) prod *= numbers[i];

  let result = BigInt(0);

  for (let i = 0; i < k; i++) {
    let pp = prod / numbers[i];
    result += BigInt(reminders[i] * moduloInverse(pp, numbers[i]) * pp);
  }

  return BigInt(result % BigInt(prod));
};

const part2 = (IDs) => {
  const numbers = IDs.filter((id) => id !== 'x').map((id) => BigInt(id));
  const reminders = IDs.map((id, index) => {
    if (id === 'x') {
      return null;
    }

    let reminder = BigInt(parseInt(id) - index);

    while (reminder < 0) {
      reminder += BigInt(parseInt(id));
    }
    return reminder;
  }).filter((x) => x !== null);

  return cheneseReminder(numbers, reminders, numbers.length);
};

console.log(part2(IDs.split(',')));
