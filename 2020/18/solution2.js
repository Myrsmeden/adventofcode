const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const expressions = input.split('\n');
const catchParenthesis = /\([^\(\)]+\)/g;
const findAdditions = /\d+\s\+\s\d+/g;

const evaluate = (string) => {
  let additions;

  while (true) {
    additions = string.match(findAdditions);

    if (additions) {
      additions.forEach((addition) => {
        const toSum = addition.split(' ');
        let value = parseInt(toSum[0]);

        for (let i = 2; i < toSum.length; i++) {
          if (toSum[i - 1] === '+') {
            value += parseInt(toSum[i]);
          }
        }

        string = string.replace(addition, value.toString());
        console.log('String is now', string);
      });
    } else {
      break;
    }
  }

  const operands = string.split(' ');
  let value = parseInt(operands[0]);

  for (let i = 2; i < operands.length; i++) {
    if (operands[i - 1] === '+') {
      value += parseInt(operands[i]);
    }

    if (operands[i - 1] === '*') {
      value *= parseInt(operands[i]);
    }
  }
  return value;
};

const evaluateExpression = (expression) => {
  let parenthesis;
  while (true) {
    parenthesis = expression.match(catchParenthesis);
    if (parenthesis) {
      parenthesis.forEach((part) => {
        const value = evaluate(part.slice(1, -1));
        expression = expression.replace(part, value.toString());
      });
    } else {
      break;
    }
  }
  return evaluate(expression);
};

const part1 = () => {
  const results = expressions.map((expression) => {
    return evaluateExpression(expression);
  });
  return results.reduce((acc, value) => acc + value, 0);
};

console.log(part1());
