const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const numbers = input.split('\n').map((num) => parseInt(num));

const PREAMBLE_LENGTH = 25;

const findPair = (numbers, sum) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (numbers[i] !== numbers[j] && numbers[i] + numbers[j] === sum) {
        return true;
      }
    }
  }
};

const part1 = () => {
  for (let i = PREAMBLE_LENGTH; i < numbers.length; i++) {
    if (!findPair(numbers.slice(i - PREAMBLE_LENGTH, i), numbers[i])) {
      return numbers[i];
    }
  }
};

const invalidNumber = part1();
console.log('Invalid number', invalidNumber)

const sum = (numbers) => numbers.reduce((acc, number) => acc + number, 0)

const findSum = (numbers, expectedSum) => {
  const accumulator = []
  for (let i = 0; i < numbers.length; i++) {
    accumulator.push(numbers[i])

    const accumulatorSum = sum(accumulator)

    if (accumulatorSum === expectedSum) {
      return [Math.min(...accumulator), Math.max(...accumulator)]
    }

    if (accumulatorSum > expectedSum) {
      return []
    }
  }
}

const part2 = () => {
  for (let i = 0; i < numbers.length; i++) {
    const res = findSum(numbers.slice(i), invalidNumber)
    if (res.length > 0) {
      return res[0] + res[1]
    }
  }
}

console.log('encryption weakness', part2())