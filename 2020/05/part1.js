const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

const boardingpasses = input.split("\n");

const getPosition = (positions, sequence) => {
  if (sequence.length === 1) {
    if (sequence[0] === "F" || sequence[0] === "L") {
      return positions[0];
    }
    return positions[1];
  }

  const [currentHalf, ...newSequence] = sequence;

  const halfIndex = Math.ceil(positions.length / 2);

  if (currentHalf === "F" || currentHalf === "L") {
    return getPosition(positions.splice(0, halfIndex), newSequence);
  }

  return getPosition(positions.splice(-halfIndex), newSequence);
};

const getRow = (sequence) => {
  const positions = Array.from({ length: 128 }, (_, index) => index);
  return getPosition(positions, sequence);
};

const getColumn = (sequence) => {
  const positions = Array.from({ length: 8 }, (_, index) => index);
  return getPosition(positions, sequence);
};

console.log(
  boardingpasses.reduce((highestId, currentPass) => {
    const row = getRow(currentPass.substr(0, 7));
    const column = getColumn(currentPass.substr(7));
    const ID = row * 8 + column;
    return Math.max(highestId, ID);
  }, 0)
);
