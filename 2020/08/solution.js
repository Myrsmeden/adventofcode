const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const instructions = input.split('\n');

const execute = (instruction, argument, pointer, accummulator) => {
  switch (instruction) {
    case 'acc':
      accummulator += argument;
      pointer += 1;
      break;
    case 'jmp':
      pointer += argument;
      break;
    case 'nop':
      pointer += 1;
      break;
  }

  return [pointer, accummulator];
};

const switchInstruction = (instruction) => {
  if (instruction === 'nop') {
    return 'jmp';
  }

  return 'nop';
};

const run = (instructionToSwitch) => {
  let pointer = 0;
  let accummulator = 0;
  const visitedPointerValues = [];
  while (pointer < instructions.length) {
    let [instruction, arg] = instructions[pointer].split(' ');
    const argument = parseInt(arg);

    if (visitedPointerValues.find((value) => value === pointer)) {
      return [false, accummulator];
    }
    visitedPointerValues.push(pointer);
    if (pointer === instructionToSwitch) {
      instruction = switchInstruction(instruction);
    }
    const [newPointer, newAccummulator] = execute(instruction, argument, pointer, accummulator);
    pointer = newPointer;
    accummulator = newAccummulator;
  }

  return [true, accummulator];
};

const part1 = () => {
  const [_, accummulator] = run(-1);
  console.log('Part1', accummulator);
};

const part2 = () => {
  const nopsAndJumps = instructions
    .map((instruction, index) => (instruction.indexOf('jmp') > -1 || instruction.indexOf('nop') > -1 ? index : null))
    .filter((x) => x);

  const result = nopsAndJumps.reduce((result, instructionToSwitch) => {
    if (result) {
      return result;
    }
    const [terminated, accummulator] = run(instructionToSwitch);
    if (terminated) {
      return accummulator;
    }
    return false;
  }, false);
  console.log('Part2', result);
};
part1();
part2();
