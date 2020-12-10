const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const adapters = input.split('\n').map((num) => parseInt(num));
const sortedAdapters = adapters.sort((a, b) => a - b);

const part1 = () => {
  const differences = sortedAdapters.map((value, index, array) => value - (array[index - 1] || 0));
  const ones = differences.filter((val) => val === 1);
  const threes = differences.filter((val) => val === 3);

  return ones.length * (threes.length + 1);
};

const newArray = (i, j, k) => {
  let arr = [];
  for (var row = 0; row < i; row++) {
    arr[row] = [];
    for (var col = 0; col < j; col++) {
      arr[row][col] = [];
      for (var dep = 0; dep < k; dep++) {
        arr[row][col][dep] = 0;
      }
    }
  }
  return arr;
};

const nearEnough = (pos1, pos2) => {
  const difference = pos2 - pos1;
  return 1 <= difference && difference <= 3;
};

const countSteps = (list, u, v) => {
  // The value count[i][j][e] stores number of steps from i to j with exactly k edges
  const V = list.length;
  const k = V + 1;
  const count = newArray(V, V, k + 1);

  // We start with 0 edges and count from bottom and up
  for (let e = 0; e <= k; e++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        count[i][j][e] = 0;

        if (e == 0 && i == j) count[i][j][e] = 1;
        if (e == 1 && nearEnough(list[i], list[j])) count[i][j][e] = 1;

        if (e > 1) {
          for (let a = 0; a < V; a++) if (nearEnough(list[i], list[a])) count[i][j][e] += count[a][j][e - 1];
        }
      }
    }
  }
  return count[u][v].reduce((acc, item) => acc + item, 0);
};

const part2 = () => {
  const adaptersWithEdges = [0, ...sortedAdapters, sortedAdapters[sortedAdapters.length - 1] + 3];
  const res = countSteps(adaptersWithEdges, 0, adaptersWithEdges.length - 1);
  return res;
};

console.log('Part1', part1());
console.log('Part2', part2());
