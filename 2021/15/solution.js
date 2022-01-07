const fs = require('fs');
const path = require('path');
const internal = require('stream');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const nodes = input.split('\n').map((row) => row.split(''));
console.log(nodes);
let graph = {};
for (let y = 0; y < nodes.length; y++) {
  for (let x = 0; x < nodes[0].length; x++) {
    const neighbours = [
      { x: x - 1, y: y },
      { x: x + 1, y: y },
      { x: x, y: y - 1 },
      { x: x, y: y + 1 },
    ].filter((item) => item.x >= 0 && item.x < nodes[0].length && item.y >= 0 && item.y < nodes.length);
    graph[`${x}:${y}`] = neighbours.reduce((acc, coords) => {
      acc[`${coords.x}:${coords.y}`] = parseInt(nodes[coords.y][coords.x]);
      return acc;
    }, {});
  }
}

const shortestDistanceNode = (distances, visited) => {
  // create a default value for shortest
  let shortest = null;

  // for each node in the distances object
  for (let node in distances) {
    // if no node has been assigned to shortest yet
    // or if the current node's distance is smaller than the current shortest
    let currentIsShortest = shortest === null || distances[node] < distances[shortest];

    // and if the current node is in the unvisited set
    if (currentIsShortest && !visited.includes(node)) {
      // update shortest to be the current node
      shortest = node;
    }
  }
  return shortest;
};

const findShortestPath = (graph, startNode, endNode) => {
  // track distances from the start node using a hash object
  let distances = {};
  distances[endNode] = 'Infinity';
  distances = Object.assign(distances, graph[startNode]);

  // track paths using a hash object
  let parents = { endNode: null };
  for (let child in graph[startNode]) {
    parents[child] = startNode;
  }

  // collect visited nodes
  let visited = [];

  // find the nearest node
  let node = shortestDistanceNode(distances, visited);

  while (node) {
    // find its distance from the start node & its child nodes
    let distance = distances[node];
    let children = graph[node];

    // for each of those child nodes:
    for (let child in children) {
      // make sure each child node is not the start node
      if (String(child) === String(startNode)) {
        continue;
      } else {
        // save the distance from the start node to the child node
        let newdistance = distance + children[child];
        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        if (!distances[child] || distances[child] > newdistance) {
          // save the distance to the object
          distances[child] = newdistance;
          // record the path
          parents[child] = node;
        }
      }
    }
    // move the current node to the visited set
    visited.push(node);
    // move to the nearest neighbor node
    node = shortestDistanceNode(distances, visited);
  }

  // using the stored paths from start node to end node
  // record the shortest path
  let shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  //this is the shortest path
  let results = {
    distance: distances[endNode],
    path: shortestPath,
  };
  // return the shortest path & the end node's distance from the start node
  return results;
};

const result = findShortestPath(graph, '0:0', `${nodes.length - 1}:${nodes[0].length - 1}`);
console.log(result.distance)