const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const paths = input.split('\n').map((path) => path.split(' -> ').map((p) => p.split(',').map((i) => parseInt(i))));
console.log(paths);
let rocks = [];
let sand = [];

paths.forEach((path) => {
  for (let i = 1; i < path.length; i++) {
    const [x1, y1] = path[i - 1];
    const [x2, y2] = path[i];

    if (x1 === x2) {
      const startY = Math.min(y1, y2);
      const endY = Math.max(y1, y2);

      for (let y = startY; y <= endY; y++) {
        rocks.push([x1, y]);
      }
    } else {
      const startX = Math.min(x1, x2);
      const endX = Math.max(x1, x2);

      for (let x = startX; x <= endX; x++) {
        rocks.push([x, y1]);
      }
    }
  }
});

const bottomY = Math.max(...rocks.map((coord) => coord[1]));

const isBlocked = (pos, task2) => {
  if (task2 && pos[1] == bottomY + 2) {
    return true;
  }
  return (
    rocks.find((rock) => rock[0] === pos[0] && rock[1] === pos[1]) ||
    sand.find((s) => s[0] === pos[0] && s[1] === pos[1])
  );
};

const placeSand = (task2 = false) => {
  let rest = false;
  let position = [500, 0];

  while (!rest) {
    const nextPosition = [position[0], position[1] + 1];

    const bottom = task2 ? bottomY + 2 : bottomY;

    if (nextPosition[1] > bottom) {
      return null;
    }

    if (!isBlocked(nextPosition, task2)) {
      position = nextPosition;
    } else {
      const downLeft = [position[0] - 1, position[1] + 1];
      if (!isBlocked(downLeft, task2)) {
        position = downLeft;
      } else {
        const downRight = [position[0] + 1, position[1] + 1];
        if (!isBlocked(downRight, task2)) {
          position = downRight;
        } else {
          rest = true;
        }
      }
    }
  }

  return position;
};

let res = placeSand();

while (res !== null) {
  sand.push(res);
  res = placeSand();
}
console.log('Task1', sand.length);

sand = [];

res = placeSand(true);

while (res !== null) {
  sand.push(res);
  res = placeSand(true);
  if (res && res[0] === 500 && res[1] === 0) {
    sand.push(res);
    break;
  }
}
console.log('Task2', sand.length);
