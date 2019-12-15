const fs = require('fs')
const Amplifier = require('../common/Amplifier')

class Tile {
  constructor(x, y, status) {
    this.x = x
    this.y = y
    this.status = status
  }
}

const updateCoordinates = (x, y, direction, status) => {
  if (status === 2) {
    return { x, y, direction }
  }

  direction = Math.floor(Math.random() * 4 + 1)

  if (status === 0) {
    return {
      x,
      y,
      direction
    }
  }

  if (direction === 1) {
    y -= 1
  }

  if (direction === 2) {
    y += 1
  }

  if (direction === 3) {
    x -= 1
  }

  if (direction === 4) {
    x += 1
  }

  return { x, y, direction }
}

const tiles = []

fs.readFile('intcodes.txt', 'utf8', (_, data) => {
  const codes = data.split(',').map(x => parseInt(x))

  const amp = new Amplifier(0, codes.slice())
  let direction = 1
  let x = 0
  let y = 0
  let status = 0
  let oxygenTile = null
  while (!amp.halted) {
    status = amp.run(direction)
    const updated = updateCoordinates(x, y, direction, status)
    x = updated.x
    y = updated.y
    direction = updated.direction
    if (!tiles.find(t => t.x === x && t.y === y)) {
      tiles.push(new Tile(x, y, status))
    }
    if (status === 2) {
      oxygenTile = new Tile(x, y, status)
      break
    }
  }
  console.log(tiles)
  console.log(oxygenTile) // Tile { x: -318, y: 61, status: 2 }
  console.log('Done')
  return
})
