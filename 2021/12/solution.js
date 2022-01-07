const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const nodes = input.split('\n').reduce((acc, edge) => {
  const [start, stop] = edge.split('-');
  const first = acc[start] || { name: start, edges: [] };
  first.edges.push(stop);
  const second = acc[stop] || { name: stop, edges: [] };
  second.edges.push(start);
  acc[start] = first;
  acc[stop] = second;
  return acc;
}, {});

const BFS = (G, root) => {
  const q = [];
  const visited = [root.name];
  q.push(root);

  while (q.length > 0) {
    const v = q.shift();
    console.log(v.name);

    if (v.name === 'end') {
      return v;
    }

    v.edges.forEach((w) => {
      if (!visited.includes(w) || w.toUpperCase() === w) {
        visited.push(w);
        q.push(G[w]);
      }
    });
  }
};
console.log(nodes);
//const R = BFS(nodes, nodes['start']);

const discovered = [];
const DFS = (graph, v) => {
  discovered.push(v.name);
  console.log(v.name);

  if (v.name === 'end') {
    return v.name;
  }

  return v.edges.map((w) => {
    if (!discovered.includes(w)) {
      return [v.name, ...DFS(graph, graph[w])];
    }

    return null;
  });
};
const R = DFS(nodes, nodes['start']);
console.log(R);
