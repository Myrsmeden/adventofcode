const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

const instructions = input.split('\n');

const getCycleValue = (instructions, cycle, getStrength = true) => {
  let X = 1;
  let cycleNumber = 0;
  for (let i = 0; i <= cycleNumber; i++) {
    const instruction = instructions[i];
    const [command, value] = instruction.split(' ');

    if (command === 'addx') {
      cycleNumber += 2;
      if (cycleNumber === cycle) {
        X += parseInt(value);
      }
    } else {
      cycleNumber += 1;
    }

    if (cycleNumber >= cycle) {
      if (getStrength) {
        return X * cycle;
      }
      return X;
    }

    if (command === 'addx') {
      X += parseInt(value);
    }
  }
};

const values = [
  getCycleValue(instructions, 20),
  getCycleValue(instructions, 60),
  getCycleValue(instructions, 100),
  getCycleValue(instructions, 140),
  getCycleValue(instructions, 180),
  getCycleValue(instructions, 220),
];

const sum = values.reduce((acc, item) => acc + item, 0);

console.log(sum);

for (let i = 1; i <= 240; i++) {
  const v = getCycleValue(instructions, i, false);

  if (Math.abs(v - (i % 40)) < 2) {
    process.stdout.write('#');
  } else {
    process.stdout.write('.');
  }

  if (i % 40 === 0) {
    console.log();
  }
}
