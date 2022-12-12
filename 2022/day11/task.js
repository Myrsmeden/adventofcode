const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

const monkeyStats = input.split('\n\n');

const createMonkey = (stat) => {
  const [name, starting, operation, testClause, trueAction, falseAction] = stat.split('\n').map((line) => line.trim());
  const id = parseInt(name.split(' ')[1].replace(':', ''));
  const items = starting
    .split(': ')[1]
    .split(', ')
    .map((item) => parseInt(item));

  const op = operation.split('= ')[1];

  const modulo = parseInt(testClause.split('by ')[1]);

  const test = (num) => num % modulo === 0;
  const ifTrue = parseInt(trueAction.split(' ').at(-1));
  const ifFalse = parseInt(falseAction.split(' ').at(-1));

  return {
    id,
    items,
    performOperation: (value) => parseInt(eval(op.replace(/old/g, value))),
    makeTest: (value) => {
      const res = test(value);

      if (res) {
        return ifTrue;
      }
      return ifFalse;
    },
    interactions: 0,
    modulo,
  };
};

let monkeys = monkeyStats.map(createMonkey);

console.log(monkeys);

const superModulo = monkeys.reduce((acc, item) => (acc *= item.modulo), 1);

console.log({ superModulo });

for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < monkeys.length; j++) {
    const currentMonkey = monkeys[j];
    while (currentMonkey.items.length) {
      const currentItem = currentMonkey.items.shift();
      const newItem = currentMonkey.performOperation(currentItem) % superModulo;
      const nextMonkey = currentMonkey.makeTest(newItem);
      monkeys.find((m) => m.id === nextMonkey).items.push(newItem);
      currentMonkey.interactions += 1;
    }
  }
}

console.log(monkeys.map((monkey) => monkey.interactions));

const [a, b, ...rest] = monkeys.map((monkey) => monkey.interactions).sort((a, b) => (a > b ? -1 : 1));
console.log(a * b);
a;
