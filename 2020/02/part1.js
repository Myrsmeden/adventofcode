const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

const passwordPolicies = input.split("\n");

const isPasswordValid = (policy, password) => {
  const [numberOfTimes, letter] = policy.split(" ");
  const [minNumberOfTimes, maxNumberOfTimes] = numberOfTimes
    .split("-")
    .map((num) => parseInt(num, 10));

  const numberOfOccurrences = password
    .split("")
    .reduce((count, pLetter) => (count += pLetter === letter ? 1 : 0), 0);

  return (
    numberOfOccurrences >= minNumberOfTimes &&
    numberOfOccurrences <= maxNumberOfTimes
  );
};
const validPasswords = passwordPolicies.filter((policy) =>
  isPasswordValid(...policy.split(": "))
);

console.log(validPasswords.length);
