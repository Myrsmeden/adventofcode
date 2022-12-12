const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

const createGridItem = (x, y, value) => {
  return {
    x,
    y,
    value,
    visited: false,
    parent: null,
  };
};

const gridItems = input
  .split('\n')
  .map((row, y) => row.split('').map((value, x) => createGridItem(x, y, value)))
  .flat();

const startItem = gridItems.find((item) => item.value === 'S');

const getNeighbours = (grid, item) => {
  const { x, y } = item;
  return [
    grid.find((i) => i.x === x && i.y === y - 1),
    grid.find((i) => i.x === x && i.y === y + 1),
    grid.find((i) => i.x === x - 1 && i.y === y),
    grid.find((i) => i.x === x + 1 && i.y === y),
  ].filter(Boolean);
};

const getCharValue = (value) => {
  if (value === 'S') {
    value = 'a';
  }

  if (value === 'E') {
    value = 'z';
  }

  return value.charCodeAt(0);
};

const BFS = (grid, root) => {
  const q = [];
  root.visited = true;
  q.push(root);

  while (q.length) {
    const v = q.shift();
    if (v.value === 'E') {
      return v;
    }

    const neighbours = getNeighbours(grid, v);

    for (let i = 0; i < neighbours.length; i++) {
      const w = neighbours[i];
      if (!w.visited && getCharValue(v.value) + 1 >= getCharValue(w.value)) {
        w.visited = true;
        w.parent = v;
        q.push(w);
      }
    }
  }
};

const end = BFS(gridItems, startItem);

let steps = 0;

let item = end;

while (item.parent) {
  item = item.parent;
  steps += 1;
}
console.log(steps);
