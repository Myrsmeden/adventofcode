const fs = require('fs')

const getAngle = (x, y) => {
  return Math.atan2(y, x)
}

class Asteroid {
  constructor(x, y, station) {
    const relativeX = x - station.x
    const relativeY = y - station.y
    this.x = x
    this.y = y
    this.r = Math.sqrt(relativeX * relativeX + relativeY * relativeY)
    this.theta = 2 * Math.PI - getAngle(relativeY, relativeX)
  }
}

const station = new Asteroid(31, 20, { x: 0, y: 0 })

fs.readFile('input.txt', 'utf8', (_, data) => {
  const asteroids = data
    .split('\n')
    .reduce((acc, line, y) => {
      return line.split('').reduce((acc, item, x) => {
        if (item === '#') {
          return [...acc, new Asteroid(x, y, station)]
        }

        return acc
      }, acc)
    }, [])
    .filter(a => !(a.x === station.x && a.y === station.y))

  const sorted = asteroids.sort((a, b) => {
    if (a.theta - b.theta === 0) return a.r - b.r

    return a.theta - b.theta
  })

  let list = sorted

  let allRotations = []
  let n = 1
  while (list.length > 0) {
    const first = list[0]
    n += 1
    const allInLine = list.filter(i => i.theta === first.theta)
    const notInLine = list.filter(i => i.theta !== first.theta)
    list = [...notInLine, ...allInLine.slice(1)]
    allRotations.push(first)
    if (allRotations.length > 200) {
      break
    }
  }

  const twoHundred = allRotations[199]
  console.log(twoHundred.x * 100 + twoHundred.y)
  return
})
