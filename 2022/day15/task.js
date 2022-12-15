const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const data = input.split('\n');

const sensors = [];
const beacons = [];

const grid = {};

const addToGrid = (item) => {
  if (!grid[item.y]) {
    grid[item.y] = {};
  }
  grid[item.y][item.x] = item;
};
data.forEach((line) => {
  const values = line.replace('Sensor at ', '').replace(': closest beacon is at', '').replace(', ', ' ').split(' ');
  const [sX, sY, bX, bY] = values.map((item) => parseInt(item.split('=')[1]));

  const distance = Math.abs(sX - bX) + Math.abs(sY - bY);
  addToGrid({ x: sX, y: sY });
  addToGrid({ x: bX, y: bY });

  sensors.push({ x: sX, y: sY, distance });
  beacons.push({ x: bX, y: bY });
});

const minX = Math.min(...sensors.map((s) => s.x));
const maxX = Math.max(...sensors.map((s) => s.x));
const maxDistance = Math.max(...sensors.map((s) => s.distance));

const maxY = 2000000;

const calcDistance = (p1, p2) => {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
};

const noBeacons = [];
for (let x = minX - maxDistance; x < maxX + maxDistance; x++) {
  const s = sensors.find((s) => {
    const d = calcDistance(s, { x, y: maxY });
    if (d <= s.distance && !beacons.find((b) => b.x === x && b.y === maxY)) {
      return true;
    }
  });
  if (s) {
    noBeacons.push({ x, y: maxY });
  }
}

let found = false;
for (let y = 0; y <= 4000000; y++) {
  grid[y] = grid[y] ?? {};
  if (found) break;
  for (let x = 0; x <= 4000000; x++) {
    let sensor = sensors.find((s) => calcDistance({ x: s.x, y: s.y }, { x, y }) <= s.distance);
    if (sensor) {
      x = sensor.x + sensor.distance - Math.abs(sensor.y - y);
    } else {
      console.log('Task2', x * 4000000 + y);
      found = true;
      break;
    }
  }
}
console.log('Task1', noBeacons.length);
