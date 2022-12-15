const fs = require('fs');

const sum = (a, b) => a + b;

const padArrayToLength = (arr, len) => [...arr, ...Array(Math.max(len, arr.length) - arr.length).fill(-1)];
const areInOrder = (left, right) => {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) return 'good';
    if (right < left) return 'bad';
    return 'continue';
  } else if (typeof left !== 'number' && typeof right !== 'number') {
    const maxLength = Math.max(left.length, right.length);
    const lArr = padArrayToLength(left, maxLength);
    const rArr = padArrayToLength(right, maxLength);
    const answer = lArr.map((val, i) => areInOrder(val, rArr[i]));
    const firstBad = answer.findIndex((ans) => ans === 'bad');
    const firstGood = answer.findIndex((ans) => ans === 'good');
    if (firstBad != -1 && firstGood != -1) {
      if (firstBad < firstGood) return 'bad';
      else return 'good';
    }
    if (firstBad != -1) return 'bad';
    if (firstGood != -1) return 'good';
    return 'continue';
  } else {
    if (typeof left === 'number') {
      if (left === -1) return 'good';
      return areInOrder([left], right);
    } else {
      if (right === -1) return 'bad';
      return areInOrder(left, [right]);
    }
  }
};

const orderStatus = packets.map((packet) => areInOrder(packet[0], packet[1]));

const input2 = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n\n')
  .map((a) => a.trim())
  .join('\n')
  .concat('\n[[2]]\n[[6]]');

const allItems = input2.split('\n').map((pack) => JSON.parse(pack));
const sorted = allItems.sort((a, b) => {
  const res = areInOrder(a, b);

  if (res === 'good') {
    return -1;
  }

  if (res === 'bad') {
    return 1;
  }

  return 0;
});

const index2 = sorted.findIndex((item) => JSON.stringify(item) === '[[2]]');

const index6 = sorted.findIndex((item) => JSON.stringify(item) === '[[6]]');

const answer = orderStatus.map((status, idx) => (status === 'good' ? idx + 1 : 0)).reduce(sum);

console.log('Task1', answer);

console.log('Task2', (index2 + 1) * (index6 + 1));
