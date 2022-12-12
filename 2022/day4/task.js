const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

const sections = input.split('\n').map((line) => line.split(','));

const isOverlapping = (s1, s2) => {
  const [start1, stop1] = s1.split('-').map((i) => parseInt(i));
  const [start2, stop2] = s2.split('-').map((i) => parseInt(i));

  if (start1 <= start2 && stop1 >= stop2) {
    return true;
  }

  if (start2 <= start1 && stop2 >= stop1) {
    return true;
  }

  return false;
};

const isNotOverlapping = (s1, s2) => {
  const [start1, stop1] = s1.split('-').map((i) => parseInt(i));
  const [start2, stop2] = s2.split('-').map((i) => parseInt(i));
  if (start1 < start2 && stop1 < start2) {
    return true;
  }

  if (start2 < start1 && stop2 < start1) {
    return true;
  }

  return false;
};

const result = sections.map((s) => isOverlapping(...s)).filter(Boolean).length;

console.log(result1);

const result2 = sections.map((s) => !isNotOverlapping(...s)).filter(Boolean).length;

console.log(result2);
