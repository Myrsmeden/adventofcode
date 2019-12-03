const fs = require('fs')

const move = (position, inst) => {
  switch (inst.substr(0, 1)) {
    case 'L':
      return [...Array(parseInt(inst.substr(1))).keys()].map(i => ({
        x: position.x - i - 1,
        y: position.y,
        s: position.s + i + 1
      }))
    case 'R':
      return [...Array(parseInt(inst.substr(1))).keys()].map(i => ({
        x: position.x + i + 1,
        y: position.y,
        s: position.s + i + 1
      }))
    case 'U':
      return [...Array(parseInt(inst.substr(1))).keys()].map(i => ({
        x: position.x,
        y: position.y - i - 1,
        s: position.s + i + 1
      }))
    case 'D':
      return [...Array(parseInt(inst.substr(1))).keys()].map(i => ({
        x: position.x,
        y: position.y + i + 1,
        s: position.s + i + 1
      }))
  }
}

const getPath = directions => {
  const path = directions.split(',').reduce((acc, inst) => {
    return [...acc, ...move(acc[acc.length-1], inst)]
  }, [{x: 0, y: 0, s: 0}])
  return path
}

fs.readFile('input.txt', 'utf8', (_, data) => {
  const [first, second] = data.split('\n')

  const path1 = getPath(first)
  const path2 = getPath(second)

  const intersections = path1.filter(
    item => -1 !== path2.findIndex(i => i.x === item.x && i.y === item.y)
  )

  const point1 = path1.find(({x, y}) => intersections[1].x === x && intersections[1].y === y)
  const point2 = path2.find(({x, y}) => intersections[1].x === x && intersections[1].y === y)
  console.log(point1.s + point2.s)
  return
})
