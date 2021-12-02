const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const [rules, messages] = input.split('\n\n').map((data) => data.split('\n'));

const ruleDefinitions = rules.reduce((map, rule) => {
  const [key, ...rules] = rule.split(/: | \| /);
  map.set(
    Number(key),
    rules.map((r) => {
      if (/"[a-z]"/i.test(r)) return { text: r.match(/"([a-z])"/i)[1] };
      else return { references: r.split(' ').map(Number) };
    }),
  );
  return map;
}, new Map());

const buildRegex = (key) => {
  const rule = ruleDefinitions.get(key);
  if (rule[0].text) {
    return rule[0].text;
  }

  const options = rule.map((option) => option.references.map((r) => buildRegex(r)).join(''));
  return `(${options.join('|')})`;
};

const buildRegex2 = (key) => {
  //8: 42 | 42 8
  //11: 42 31 | 42 11 31
  if (key === 8) {
    return `${buildRegex2(42)}+`;
  }
  if (key === 11) {
    let hackyRegex = [];
    let x = 1;
    const fortytwo = buildRegex2(42);
    const thirtyone = buildRegex2(31);
    while (x < 5) {
      hackyRegex.push(`(${fortytwo}{${x}}${thirtyone}{${x}})`);
      x++;
    }
    return `(${hackyRegex.join('|')})`;
  }
  const rule = ruleDefinitions.get(key);
  if (rule[0].text) {
    return rule[0].text;
  }

  const options = rule.map((option) => option.references.map((r) => buildRegex2(r)).join(''));
  return `(${options.join('|')})`;
};

const part1 = () => {
  const regex = `^${buildRegex(0)}$`;
  const re = new RegExp(regex);

  const valid = messages.filter((message) => re.test(message));
  return valid.length;
};

console.log(part1());

const part2 = () => {
  const regex = `^${buildRegex2(0)}$`;
  const re = new RegExp(regex);

  const valid = messages.filter((message) => re.test(message));
  return valid.length;
};

console.log(part2());
