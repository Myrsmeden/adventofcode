const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const reports = input.split('\n').map((input) => input.split(''));

const getBitOccurrence = (reports, position, common = true) => {
  if (reports.length === 1) {
    return reports[0].join('');
  }
  const bitsInPosition = reports.reduce((acc, report) => [...acc, report[position]], []);
  const ones = bitsInPosition.filter((bit) => bit === '1');
  const zeros = bitsInPosition.filter((bit) => bit === '0');
  const result = ones.length >= zeros.length ? 1 : 0;
  const bitToKeep = (common ? result : 1 - result).toString();
  const keptReports = reports.filter((report) => report[position] === bitToKeep);
  return getBitOccurrence(keptReports, position + 1, common);
};

const oxygen = parseInt(getBitOccurrence(reports, 0), 2);
const co2 = parseInt(getBitOccurrence(reports, 0, false), 2);

console.log(oxygen * co2);
