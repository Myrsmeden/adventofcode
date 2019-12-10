const fs = require('fs')

const isBetween = (a, b, c) => {
  if (a.x == c.x && a.y == c.y) {
    return false
  }
  if (b.x == c.x && b.y == c.y) {
    return false
  }
  const epsilon = 0.01
  const crossProduct = (c.y - a.y) * (b.x - a.x) - (c.x - a.x) * (b.y - a.y)
  if (Math.abs(crossProduct) > epsilon) {
    return false
  }

  const dotProduct = (c.x - a.x) * (b.x - a.x) + (c.y - a.y) * (b.y - a.y)

  if (dotProduct < 0) {
    return false
  }

  const lengthSquared = (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y)
  if (dotProduct > lengthSquared) {
    return false
  }

  return true
}

class Asteroid {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  calcLineOfSight(asteriods) {
    this.lineOfSight = asteriods
      .filter(a => a.x !== this.x || a.y !== this.y)
      .reduce((acc, b, _, all) => {
        if (
          !all.reduce((acc, c) => {
            return acc || isBetween(this, b, c)
          }, false)
        ) {
          return acc + 1
        }
        return acc
      }, 0)
    return this.lineOfSight
  }
}
fs.readFile('input.txt', 'utf8', (_, data) => {
  const asteroids = data.split('\n').reduce((acc, line, y) => {
    return line.split('').reduce((acc, item, x) => {
      if (item === '#') {
        return [...acc, new Asteroid(x, y)]
      }

      return acc
    }, acc)
  }, [])
  console.log(
    asteroids.reduce(
      (acc, a) => {
        const numVisible = a.calcLineOfSight(asteroids)
        return {
          max: Math.max(acc.max, numVisible),
          a: numVisible > acc.max ? a : acc.a
        }
      },
      { max: 0, a: null }
    )
  )
})
