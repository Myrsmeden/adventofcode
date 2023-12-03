const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

const lines = input.split('\n');

const values = lines.map((line) => {
  const numbers = line.replace(/[a-z]/g, '');
  const amount = numbers[0] + numbers[numbers.length - 1];

  return parseInt(amount);
});

const digits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const digitifyFirst = (line, firstDigitIndex) => {
  console.log(firstDigitIndex);
  for (let i = 0; i < line.length - 5; i++) {
    if (i >= firstDigitIndex && firstDigitIndex !== -1) {
      return line;
    }
    const part = line.slice(i, i + 5);
    const thing = Object.keys(digits).find((letters) => part.includes(letters));
    if (thing) {
      return line.replace(thing, digits[thing]);
    }
  }

  return line;
};

const digitifyLast = (line) => {
  if (line.length <= 5) {
    const thing = Object.keys(digits).find((letters) => line.includes(letters));
    if (thing) {
      return line.replace(thing, digits[thing]);
    }
  }
  for (let i = line.length; i >= 5; i--) {
    if (i > line.length - 3) {
      let part = line.slice(i - 3, i);
      console.log('p1', part);
      let thing = Object.keys(digits).find((letters) => part.includes(letters));
      if (thing) {
        return line.slice(0, i - 3) + part.replace(thing, digits[thing]) + line.slice(i);
      }

      part = line.slice(i - 4, i);
      console.log('p2', part);
      thing = Object.keys(digits).find((letters) => part.includes(letters));
      if (thing) {
        return line.slice(0, i - 4) + part.replace(thing, digits[thing]) + line.slice(i);
      }
    }

    const part = line.slice(i - 5, i);
    console.log('p3', part);
    const thing = Object.keys(digits).find((letters) => part.includes(letters));
    if (thing) {
      return line.slice(0, i - 5) + part.replace(thing, digits[thing]) + line.slice(i);
    }
  }

  return line;
};

const firstIndexOfDigit = (line) => {
  return line.split('').findIndex((item) => !isNaN(parseInt(item)));
};

const firstNumberRegExp = new RegExp(Object.keys(digits).join('|'));
const lastNumberRegExp = new RegExp(
  Object.keys(digits)
    .map((p) => p.split('').reverse().join(''))
    .join('|'),
);

const values2 = lines.map((line) => {
  let firstNumber = 0;
  let lastNumber = 0;
  const firstNumberIndex = line.split('').findIndex((f) => !isNaN(f));

  const firstIndexWordResult = line.match(firstNumberRegExp);

  const lastNumberIndex = line.split('').findLastIndex((f) => !isNaN(f));

  const lastIndexWordResult = line.split('').reverse().join('').match(lastNumberRegExp);

  if (firstIndexWordResult) {
    if (firstIndexWordResult.index < firstNumberIndex || firstNumberIndex === -1) {
      firstNumber = digits[firstIndexWordResult[0]].toString();
    } else {
      firstNumber = line.charAt(firstNumberIndex);
    }
  } else {
    firstNumber = line.charAt(firstNumberIndex);
  }

  if (lastIndexWordResult) {
    const lastWordPosition = line.length - lastIndexWordResult.index;
    if (lastWordPosition > lastNumberIndex || lastNumberIndex === -1) {
      lastNumber = digits[lastIndexWordResult[0].split('').reverse().join('')].toString();
    } else {
      lastNumber = line.charAt(lastNumberIndex);
    }
  } else {
    lastNumber = line.charAt(lastNumberIndex);
  }

  return parseInt(firstNumber + lastNumber);
});

console.log(values2);

const sum = values.reduce((acc, num) => acc + num, 0);
const sum2 = values2.reduce((acc, num) => acc + num, 0);

console.log({ sum, sum2 });
