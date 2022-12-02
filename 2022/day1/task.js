const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

const elves = input.split('\n\n').map((elf) => elf.split('\n').map((i) => parseInt(i)));

const sums = elves.map((elf) => elf.reduce((acc, item) => acc + item, 0));
const highest = Math.max(...sums);
const sortedSums = sums.sort((a, b) => (b > a ? 1 : -1));
const topThreeSums = sortedSums[0] + sortedSums[1] + sortedSums[2];
console.log({ highest, topThreeSums });
