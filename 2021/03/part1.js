const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const reports = input.split('\n').map((input) => input.split(''));

const getBitOccurrence = (reports, position, common = true) => {
  const bitsInPosition = reports.reduce((acc, report) => [...acc, report[position]], []);
  const ones = bitsInPosition.filter((bit) => bit === '1');
  const zeros = bitsInPosition.filter((bit) => bit === '0');
  const result = ones.length > zeros.length ? 1 : 0;
  return (common ? result : 1 - result).toString();
};

const gamma = parseInt(
  reports[0].reduce((acc, _, position) => `${acc}${getBitOccurrence(reports, position)}`, ''),
  2,
);

const epsilon = parseInt(
  reports[0].reduce((acc, _, position) => `${acc}${getBitOccurrence(reports, position, false)}`, ''),
  2,
);

console.log(gamma * epsilon);
