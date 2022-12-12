const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

const rucksacks = input.split('\n').map((line) => [line.slice(0, line.length / 2), line.slice(line.length / 2)]);
const rawRucksacks = input.split('\n');
const sharedItems = rucksacks.map((rucksack) => {
  const [comp1, comp2] = rucksack;
  for (let i = 0; i < comp1.length; i++) {
    if (comp2.includes(comp1[i])) {
      return comp1[i];
    }
  }
});

// a = 97, A=65
const getValue = (letter) => {
  const code = letter.charCodeAt(0);
  if (code >= 97) {
    return code - 97 + 1;
  }

  return code - 65 + 27;
};

const values = sharedItems.map(getValue);

const sum = values.reduce((acc, item) => acc + item, 0);
console.log(sum);

const getSharedItems = (r1, r2, r3) => {
  console.log({ r1, r2, r3 });
  const heighestLength = Math.max(r1.length, r2.length, r3.length);
  let base, others;
  if (heighestLength === r1.length) {
    base = r1;
    others = [r2, r3];
  }

  if (heighestLength === r2.length) {
    base = r2;
    others = [r1, r3];
  }

  if (heighestLength === r3.length) {
    base = r3;
    others = [r2, r1];
  }
  for (let i = 0; i <= base.length; i++) {
    if (others[0].includes(base[i]) && others[1].includes(base[i])) {
      return base[i];
    }
  }
};

const shared = [];

for (let j = 0; j < rawRucksacks.length / 3; j += 1) {
  shared.push(getSharedItems(rawRucksacks[3 * j], rawRucksacks[3 * j + 1], rawRucksacks[3 * j + 2]));
}

const values2 = shared.map(getValue);

const sum2 = values2.reduce((acc, item) => acc + item, 0);

console.log(sum2);
