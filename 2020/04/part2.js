const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

const REQUIRED_FIELDS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const passports = input.split("\n\n");

const hasValidValue = (key, value) => {
  switch (key) {
    case "byr":
      return (
        value.length === 4 &&
        Number.isInteger(Number(value)) &&
        Number(value) >= 1920 &&
        Number(value) <= 2002
      );
    case "iyr":
      return (
        value.length === 4 &&
        Number.isInteger(Number(value)) &&
        Number(value) >= 2010 &&
        Number(value) <= 2020
      );
    case "eyr":
      return (
        value.length === 4 &&
        Number.isInteger(Number(value)) &&
        Number(value) >= 2020 &&
        Number(value) <= 2030
      );
    case "hgt": {
      const re = /\d+(cm|in)/gm;
      const valid = re.test(value);
      const numbers = Number(value.replace("cm", "").replace("in", ""));
      if (value.indexOf("cm") > -1) {
        return valid && numbers >= 150 && numbers <= 193;
      }

      if (value.indexOf("in") > -1) {
        return valid && numbers >= 59 && numbers <= 76;
      }
    }
    case "hcl": {
      const re = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gm;
      return re.test(value);
    }

    case "ecl":
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
    case "pid":
      return value.length === 9 && Number.isInteger(Number(value));
  }
};

const isValid = (passportData) => {
  const fields = passportData.split(/\n|\s/).reduce((acc, field) => {
    const [key, value] = field.split(":");
    return { ...acc, [key]: value };
  }, {});

  return REQUIRED_FIELDS.reduce((hasAll, field) => {
    return (
      hasAll &&
      Object.keys(fields).includes(field) &&
      hasValidValue(field, fields[field])
    );
  }, true);
};

console.log(passports.filter(isValid).length);
