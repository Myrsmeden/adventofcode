const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const directions = input.split('\n');

const turn = (direction, instruction) => {
  const turns = ['east', 'south', 'west', 'north'];
  const [leftRight, degress] = [instruction.slice(0, 1), parseInt(instruction.slice(1))];

  const steps = degress / 90;

  const currentTurnIndex = turns.findIndex((item) => item === direction);

  const numberOfSteps = leftRight === 'L' ? -1 : 1;

  const newIndex = currentTurnIndex + numberOfSteps * steps;

  if (newIndex >= turns.length) {
    return turns[newIndex - turns.length];
  }

  if (newIndex < 0) {
    return turns[newIndex + turns.length];
  }

  return turns[newIndex];
};

const part1 = () => {
  let direction = 'east';

  const positions = {
    north: 0,
    east: 0,
    west: 0,
    south: 0,
  };

  directions.forEach((instruction) => {
    const [action, value] = [instruction.slice(0, 1), parseInt(instruction.slice(1))];

    if (action === 'R' || action === 'L') {
      direction = turn(direction, instruction);
      return;
    }

    if (action === 'F') {
      positions[direction] += value;
      return;
    }

    if (action === 'N') {
      positions['north'] += value;
    }

    if (action === 'E') {
      positions['east'] += value;
    }

    if (action === 'W') {
      positions['west'] += value;
    }

    if (action === 'S') {
      positions['south'] += value;
    }
  });

  return Math.abs(positions['north'] - positions['south']) + Math.abs(positions['east'] - positions['west']);
};

console.log(part1());

const rotateWaypoint = (instruction, waypointPositions) => {
  const turns = ['east', 'south', 'west', 'north'];
  const [leftRight, degress] = [instruction.slice(0, 1), parseInt(instruction.slice(1))];

  const steps = degress / 90;

  let newWaypointPositions = {};
  newWaypointPositions['north'] = newWaypointPositions['north'];
  newWaypointPositions['east'] = newWaypointPositions['east'];

  if (leftRight === 'L') {
    for (let i = 0; i < steps; i++) {
      newWaypointPositions['north'] = waypointPositions['east'];
      newWaypointPositions['east'] = -waypointPositions['north'];

      waypointPositions['north'] = newWaypointPositions['north'];
      waypointPositions['east'] = newWaypointPositions['east'];
    }
  }

  if (leftRight === 'R') {
    for (let i = 0; i < steps; i++) {
      newWaypointPositions['north'] = -waypointPositions['east'];
      newWaypointPositions['east'] = waypointPositions['north'];

      waypointPositions['north'] = newWaypointPositions['north'];
      waypointPositions['east'] = newWaypointPositions['east'];
    }
  }

  return newWaypointPositions;
};

const part2 = () => {
  let direction = 'east';

  let waypointPositions = {
    north: 1,
    east: 10,
  };

  const shipPositions = {
    north: 0,
    east: 0,
  };

  directions.forEach((instruction) => {
    const [action, value] = [instruction.slice(0, 1), parseInt(instruction.slice(1))];

    if (action === 'R' || action === 'L') {
      waypointPositions = rotateWaypoint(instruction, waypointPositions);
    }

    if (action === 'F') {
      const [north, east] = [value * waypointPositions['north'], value * waypointPositions['east']];

      shipPositions['north'] += north;
      shipPositions['east'] += east;
    }

    if (action === 'N') {
      waypointPositions['north'] += value;
    }

    if (action === 'E') {
      waypointPositions['east'] += value;
    }

    if (action === 'W') {
      waypointPositions['east'] -= value;
    }

    if (action === 'S') {
      waypointPositions['north'] -= value;
    }
  });

  return Math.abs(shipPositions['north']) + Math.abs(shipPositions['east']);
};

console.log(part2());
