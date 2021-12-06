const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const ages = input.split(',').map((item) => parseInt(item));
const TOTAL_DAYS = 80;

const makeBaby = (age, day) => {
  if (day === TOTAL_DAYS) {
    return [age];
  }
  if (age === 0) {
    return [...makeBaby(6, day + 1), ...makeBaby(8, day + 1)];
  }

  return [...makeBaby(age - 1, day + 1)];
};

const result = ages.reduce((acc, age) => [...acc, ...makeBaby(age, 0)], []);

console.log(result.length);
