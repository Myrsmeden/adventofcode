const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const [template, rulesInput] = input.split('\n\n').map((part) => part.split('\n'));
const rules = rulesInput.reduce((acc, item) => {
  const [k, v] = item.split(' -> ');
  acc[k] = v;
  return acc;
}, {});
const arrayChunks = (array, chunk_size, partition_size) =>
  Array(Math.ceil((2 * array.length) / chunk_size))
    .fill()
    .map((_, index) => index * (chunk_size / partition_size))
    .map((begin) => array.slice(begin, begin + chunk_size))
    .filter((item) => item.length === 2);
let groups = template[0];
const lastElement = groups.charAt(groups.length - 1);

let counts = arrayChunks(groups, 2, 2).reduce((acc, item) => {
  const current = acc[item] || 0;
  acc[item] = current + 1;
  return acc;
}, {});

const getTotal = (counts) => {
  const t = Object.entries(counts).reduce((acc, [pair, count], index, orig) => {
    const [first, second] = pair.split('');
    const firstCount = acc[first] || 0;

    acc[first] = firstCount + count;

    return acc;
  }, {});
  t[lastElement] += 1;
  return t;
};

const iteration = (counts) =>
  Object.entries(counts).reduce((acc, [pair, count]) => {
    const [first, second] = pair.split('');
    const newChar = rules[pair];
    const newFirst = acc[`${first}${newChar}`] || 0;
    const newSecond = acc[`${newChar}${second}`] || 0;
    acc[`${first}${newChar}`] = newFirst + count;
    acc[`${newChar}${second}`] = newSecond + count;
    return acc;
  }, {});

for (let i = 0; i < 40; i++) {
  counts = iteration(counts);
}

const totalCounts = getTotal(counts);

const max = Math.max(...Object.values(totalCounts));
const min = Math.min(...Object.values(totalCounts));
console.log(max - min);
