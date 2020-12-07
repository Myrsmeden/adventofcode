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
      const number = parseInt(
        numberAndColor.substr(0, numberAndColor.indexOf(" "))
      );
      const color = numberAndColor
        .substr(numberAndColor.indexOf(" ") + 1)
        .replace("bags", "")
        .replace("bag", "")
        .trim();
      if (color === "other") {
        return null;
      }
      return { color, number };
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

const getBag = (color) => bags.find((bag) => bag.color === color);
const getBagsContaining = (color) =>
  bags.filter((bag) => {
    console.log(bag, color);
    return bag.contains.find((bag) => bag.color === color);
  });

const shinyGoldBag = getBag("shiny gold");

const traverse = (bag, bagNumber = 1) => {
  if (bag.contains.length === 0) {
    return bagNumber;
  }

  const numberOfBagsInside = bag.contains.reduce((count, { color, number }) => {
    const traversed = traverse(getBag(color), number);
    return count + traversed;
  }, 0);
  return bagNumber + bagNumber * numberOfBagsInside;
};

const start = shinyGoldBag.contains.reduce(
  (count, bag) => count + bag.number,
  0
);

console.log(traverse(shinyGoldBag) - 1);
