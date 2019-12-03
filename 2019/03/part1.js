const fs = require('fs')

const move = (position, inst) => {
  switch (inst.substr(0, 1)) {
    case 'L':
      return [...Array(parseInt(inst.substr(1))).keys()].map(i => {return {
        x: position.x - i - 1,
        y: position.y
      }})
    case 'R':
      return [...Array(parseInt(inst.substr(1))).keys()].map(i => ({
        x: position.x + i + 1,
        y: position.y
      }))
    case 'U':
      return [...Array(parseInt(inst.substr(1))).keys()].map(i => ({
        x: position.x,
        y: position.y - i - 1
      }))
    case 'D':
      return [...Array(parseInt(inst.substr(1))).keys()].map(i => ({
        x: position.x,
        y: position.y + i + 1
      }))
  }
}

const getPath = directions => {
  const path = directions.split(',').reduce((acc, inst) => {
    return [...acc, ...move(acc[acc.length-1], inst)]
  }, [{x: 0, y: 0}])
  return path
}

const getDistance = (point, start) =>
  Math.abs(start[0] - point.x) + Math.abs(start[1] - point.y)

fs.readFile('input.txt', 'utf8', (_, data) => {
  const [first, second] = data.split('\n')

  const path1 = getPath(first)
  const path2 = getPath(second)

  const intersections = path1.filter(
    item => -1 !== path2.findIndex(i => i.x === item.x && i.y === item.y)
  )
  const distances = intersections.map(intersection =>
    getDistance(intersection, [0, 0])
  )
  console.log(distances.sort((a, b) => a - b)[1])
  return
})
