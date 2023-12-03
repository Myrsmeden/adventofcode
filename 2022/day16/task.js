const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const createGridItem = (name, value, neighbours) => {
  return {
    name,
    value,
    neighbours,
    visited: false,
    parent: null,
  };
};

const grid = input.split('\n').map((line) => {
  const [first, second] = line.split('; ');
  const name = first.split(' ')[1];
  const value = parseInt(first.split('=')[1]);
  const neighbours = (second.split('valves ')?.[1] || second.split('valve ')?.[1]).split(', ');
  return createGridItem(name, value, neighbours);
});

const DFS = (grid, root) => {
  const s = [];
  let minutes = 30;
  root.visited = true;
  s.push(root);

  while (s.length && minutes >= 0) {
    const v = s.pop();
    console.log({ v, minutes });
    if (minutes === 0) {
      return v;
    }

    const neighbours = v.neighbours.map((n) => grid.find((i) => i.name === n));

    for (let i = 0; i < neighbours.length; i++) {
      const w = neighbours[i];
      if (!w.visited) {
        w.visited = true;
        w.parent = v;
        s.push(w);
      }
    }

    minutes -= 1;
  }
};

const startItem = grid.find((items) => items.name === 'AA');

const res = DFS(grid, startItem);
console.log(res);
