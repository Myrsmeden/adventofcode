const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

const passwordPolicies = input.split("\n");

const isPasswordValid = (policy, password) => {
  const [numberOfTimes, letter] = policy.split(" ");
  const [position1, position2] = numberOfTimes
    .split("-")
    .map((num) => parseInt(num, 10));

  const position1Containing = password.charAt(position1 - 1) === letter;
  const position2Containing = password.charAt(position2 - 1) === letter;

  return position1Containing != position2Containing;
};
const validPasswords = passwordPolicies.filter((policy) =>
  isPasswordValid(...policy.split(": "))
);

console.log(validPasswords.length);
