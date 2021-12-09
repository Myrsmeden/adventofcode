const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const segmentsToNumber = {
  2: 1,
  3: 7,
  4: 4,
  7: 8,
};

const multiplePossibilities = {
  6: [0, 6, 9],
  5: [2, 3, 5],
};

const lines = input.split('\n').map((item) => item.split('|').map((subitem) => subitem.trim().split(' ')));

const diff = (str1, str2) => {
  const map1 = str1.split('');
  const map2 = str2.split('');
  return map1.filter((item) => !map2.includes(item)).join('');
};
const result = lines.map(([inp, out]) => {
  const knownNumbers = inp.reduce((acc, seq) => {
    if (Object.keys(segmentsToNumber).includes(seq.length.toString())) {
      acc[segmentsToNumber[seq.length]] = seq.split('').sort().join('');
    } else {
      const sequences = acc[seq.length] || [];
      sequences.push(seq.split('').sort().join(''));
      acc[seq.length] = sequences;
    }

    return acc;
  }, {});

  const top = knownNumbers[7]
    .split('')
    .filter((letter) => !knownNumbers[1].includes(letter))
    .join('');

  const sixDiffs = knownNumbers[6].map((unknown, index, orig) => {
    const otherIndex = index === 0 ? orig.length - 1 : index - 1;
    return diff(unknown, orig[otherIndex]);
  });

  const numberSixIndex = sixDiffs.findIndex((item) => knownNumbers[1].includes(item));
  const topRight = sixDiffs[numberSixIndex];

  const numberFive = knownNumbers[5].find((item) => !item.includes(topRight));

  const numberNine = `${numberFive}${topRight}`.split('').sort().join('');

  const numberSix = knownNumbers[6][(3 + numberSixIndex - 1) % 3];
  const bottomLeft = diff(knownNumbers[8], numberNine);
  const numberTwo = knownNumbers[5].find((item) => item.includes(bottomLeft));

  const numberThree = knownNumbers[5].find((item) => item !== numberTwo && item !== numberFive);
  const numberZero = knownNumbers[6].find((item) => item !== numberSix && item !== numberNine);

  const key = {
    0: numberZero,
    1: knownNumbers[1],
    2: numberTwo,
    3: numberThree,
    4: knownNumbers[4],
    5: numberFive,
    6: numberSix,
    7: knownNumbers[7],
    8: knownNumbers[8],
    9: numberNine,
  };

  const r = out
    .map((str) => str.split('').sort().join(''))
    .map((str) => parseInt(Object.entries(key).find(([num, val]) => val === str)[0]));
  return r;
});
console.log(result.reduce((acc, res) => acc + parseInt(res.join('')), 0));
/*
const uniqueKnownNumbers = Object.entries(knownNumbers).reduce((acc, [number, sequences]) => {
  acc[number] = new Set(sequences);
  return acc;
}, {});

console.log(uniqueKnownNumbers);*/
