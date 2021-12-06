const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const ages = input.split(',').map((item) => parseInt(item));
const groupedAges = ages.reduce(
  (acc, age) => {
    const current = acc[age] || 0;
    acc[age] = current + 1;
    return acc;
  },
  { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
);
const TOTAL_DAYS = 256;
const result = Array.from({ length: TOTAL_DAYS }).reduce((acc, _day) => {
  const zeros = acc[0];

  acc[0] = acc[1];
  acc[1] = acc[2];
  acc[2] = acc[3];
  acc[3] = acc[4];
  acc[4] = acc[5];
  acc[5] = acc[6];
  acc[6] = zeros + acc[7];
  acc[7] = acc[8];
  acc[8] = zeros;

  return acc;
}, groupedAges);

console.log(Object.values(result).reduce((acc, item) => acc + item, 0));
