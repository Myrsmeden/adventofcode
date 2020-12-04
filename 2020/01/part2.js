const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

const numbers = input.split("\n").map((num) => parseInt(num, 10));

const findNumber = (numbers) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      for (let k = 0; k < numbers.length; k++) {
        if (numbers[i] + numbers[j] + numbers[k] === 2020) {
          return numbers[i] * numbers[j] * numbers[k];
        }
      }
    }
  }
};

console.log(findNumber(numbers));
