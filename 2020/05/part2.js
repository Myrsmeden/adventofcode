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

const IDs = boardingpasses.map((currentPass) => {
  const row = getRow(currentPass.substr(0, 7));
  const column = getColumn(currentPass.substr(7));
  return row * 8 + column;
});

const sortedIds = IDs.sort((a, b) => a - b);

const myId = sortedIds.reduce((myId, currentId, index, arr) => {
  if (index > 0 && arr[index - 1] !== currentId - 1) {
    return currentId - 1;
  }

  return myId;
}, 0);

console.log(myId);
