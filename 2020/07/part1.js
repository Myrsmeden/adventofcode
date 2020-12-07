const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

const bagTypes = input.split("\n");

const parseInput = (inputString) => {
  const [color, rest] = inputString.split("bags contain");
  const contains = rest
    .split(", ")
    .map((numberAndColor) => {
      numberAndColor = numberAndColor.trim().replace(".", "");
      const color = numberAndColor
        .substr(numberAndColor.indexOf(" ") + 1)
        .replace("bags", "")
        .replace("bag", "")
        .trim();
      if (color === "other") {
        return null;
      }
      return color;
    })
    .filter((x) => x);

  return [color.trim(), contains];
};

const bags = bagTypes.reduce((bags, inputString) => {
  const [color, contains] = parseInput(inputString);

  let bag = bags.find((bag) => bag.color === color);
  if (!bag) {
    bag = { color, contains };
    bags.push(bag);
  } else {
    bag.contains = [...bag.contains, ...contains];
  }

  return bags;
}, []);
const getBagsContaining = (color) =>
  bags.filter((bag) => bag.contains.includes(color));

const traverse = (bag) => {
  const parents = getBagsContaining(bag.color);
  if (parents.length === 0) {
    return [bag.color];
  }

  return [
    bag.color,
    ...parents.reduce((colors, bag) => [...colors, ...traverse(bag)], []),
  ];
};

const shinyGoldBags = getBagsContaining("shiny gold");

const result = shinyGoldBags.reduce((colors, bag) => {
  return [...colors, ...traverse(bag)];
}, []);
console.log(new Set([...result]).size);
