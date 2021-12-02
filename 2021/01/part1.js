const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

const numbers = input.split("\n").map((num) => parseInt(num, 10));

const increasing = numbers.map((current, index, original) => {
  if (index === 0) {
    return null
  }

  return current > original[index-1]
})

console.log(increasing.filter(Boolean).length);
