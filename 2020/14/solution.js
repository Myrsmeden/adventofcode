const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const instructions = input.split('\n');

const part1 = () => {
  let mask = '';
  const filledMemory = instructions.reduce((mem, instruction) => {
    if (instruction.indexOf('mask') > -1) {
      mask = instruction.split('= ')[1];
    }

    if (instruction.indexOf('mem') > -1) {
      const address = instruction.substring(instruction.indexOf('[') + 1, instruction.indexOf(']'));
      const value = parseInt(instruction.split('= ')[1]);
      const valueString = value.toString(2).padStart(36, '0');
      const maskedValue = mask.split('').reduce((masked, mask, index) => {
        if (mask === 'X') {
          masked[index] = valueString[index];
          return masked;
        }
        masked[index] = mask;
        return masked;
      }, {});
      mem[address] = parseInt(Object.values(maskedValue).join(''), 2);
    }

    return mem;
  }, {});

  return Object.values(filledMemory).reduce((sum, a) => sum + a, 0);
};

// console.log(part1());

const getBinaryNumberForPosition = (variant, position) => {
  const padded = variant.toString(2).padStart(32, '0');
  return padded.charAt(padded.length - position - 1);
};

const part2 = () => {
  let mask = '';
  const filledMemory = instructions.reduce((mem, instruction) => {
    if (instruction.indexOf('mask') > -1) {
      mask = instruction.split('= ')[1];
    }

    if (instruction.indexOf('mem') > -1) {
      const address = parseInt(instruction.substring(instruction.indexOf('[') + 1, instruction.indexOf(']')));
      const value = parseInt(instruction.split('= ')[1]);
      const originalAddress = address.toString(2).padStart(36, '0');
      const maskedAddress = Object.values(
        mask.split('').reduce((masked, mask, index) => {
          if (mask === '0') {
            masked[index] = originalAddress[index];
            return masked;
          }
          masked[index] = mask;
          return masked;
        }, {}),
      ).join('');

      const numberOfFloating = maskedAddress.split('').filter((x) => x === 'X').length;
      const allAddresses = Array.from(Array(Math.pow(2, numberOfFloating)).keys()).map((variant) => {
        let temp = Array.from(maskedAddress.length);
        let position = 0;
        for (let i = maskedAddress.length - 1; i >= 0; i--) {
          if (maskedAddress[i] === 'X') {
            temp[i] = getBinaryNumberForPosition(variant, position);
            position += 1;
          } else {
            temp[i] = maskedAddress[i];
          }
        }
        return temp.join('');
      });
      allAddresses.forEach((addr) => {
        mem[addr] = value;
      });
    }

    return mem;
  }, {});

  return Object.values(filledMemory).reduce((sum, a) => sum + a, 0);
};

console.log(part2());
