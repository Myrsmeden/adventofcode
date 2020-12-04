const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

const REQUIRED_FIELDS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const passports = input.split("\n\n");

const isValid = passportData => {
  const fields = passportData.split(/\n|\s/).map(field => field.split(':')[0])
  return REQUIRED_FIELDS.reduce((hasAll, field) => hasAll && fields.includes(field), true)
}

console.log(passports.filter(isValid).length);
