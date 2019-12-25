const fs = require('fs')
class Tile {
  constructor(x, y, content) {
    this.x = x
    this.y = y
    this.content = content
  }
}

class Level {
  constructor(tiles, depth) {
    this.tiles = tiles
    this.depth = depth
  }
}

const emptyTiles = () => {
  const tiles = []
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      tiles.push(new Tile(x, y, '.'))
    }
  }
  return tiles
}

const getAdjacentTiles = (tile, tiles, upperLevel, lowerLevel) => {
  upperLevel = upperLevel || { tiles: [] }
  lowerLevel = lowerLevel || { tiles: [] }
  let [south, north, east, west] = [
    tiles.find(t => t.x === tile.x && t.y === tile.y + 1),
    tiles.find(t => t.x === tile.x && t.y === tile.y - 1),
    tiles.find(t => t.x === tile.x + 1 && t.y === tile.y),
    tiles.find(t => t.x === tile.x - 1 && t.y === tile.y)
  ]

  let additionalTiles = []

  if (
    [south, north, east, west].filter(x => x).find(t => t.x === 2 && t.y === 2)
  ) {
    if (tile.x === 2 && tile.y === 1) {
      additionalTiles = lowerLevel.tiles.filter(t => t.y === 0)
    }

    if (tile.x === 2 && tile.y === 3) {
      additionalTiles = lowerLevel.tiles.filter(t => t.y === 4)
    }

    if (tile.x === 1) {
      additionalTiles = lowerLevel.tiles.filter(t => t.x === 0)
    }

    if (tile.x === 3) {
      additionalTiles = lowerLevel.tiles.filter(t => t.x === 4)
    }
  } else {
    if (!north) {
      north = upperLevel.tiles.find(t => t.x === 2 && t.y === 1)
    }

    if (!south) {
      south = upperLevel.tiles.find(t => t.x === 2 && t.y === 3)
    }

    if (!east) {
      east = upperLevel.tiles.find(t => t.x === 3 && t.y === 2)
    }

    if (!west) {
      west = upperLevel.tiles.find(t => t.x === 1 && t.y === 2)
    }
  }

  return [south, north, east, west].concat(additionalTiles).filter(x => x)
}

const updateTiles = levels => {
  return levels.reduce((acc, level, _, levels) => {
    let upperLevel = levels.find(l => l.depth === level.depth + 1)

    let lowerLevel = levels.find(l => l.depth === level.depth - 1)

    const newTiles = level.tiles.map((tile, _, tiles) => {
      if (tile.x === 2 && tile.y === 2) {
        return { ...tile }
      }
      if (tile.content === '#') {
        if (
          getAdjacentTiles(tile, tiles, upperLevel, lowerLevel).filter(
            t => t.content === '#'
          ).length !== 1
        ) {
          return { ...tile, content: '.' }
        }
        return { ...tile }
      }

      if (
        [1, 2].includes(
          getAdjacentTiles(tile, tiles, upperLevel, lowerLevel).filter(
            t => t.content === '#'
          ).length
        )
      ) {
        return { ...tile, content: '#' }
      }

      return { ...tile }
    })

    return acc.concat(new Level(newTiles, level.depth))
  }, [])
}

fs.readFile('input.txt', 'utf8', (_, data) => {
  const tiles = data
    .split('\n')
    .reduce((acc, line, y) => {
      return line.split('').reduce((acc, tileContent, x) => {
        return acc.concat(new Tile(x, y, tileContent))
      }, acc)
    }, [])

  const level0 = new Level(tiles, 0)
  const levels = [level0]

  const result200 = [...Array(200).keys()].reduce((levels, run) => {
    const moreLevels = [
      new Level(emptyTiles(), run + 1),
      new Level(emptyTiles(), -(run + 1))
    ]
    return updateTiles(levels.concat(moreLevels))
  }, levels)

  console.log(
    result200.reduce(
      (acc, level) =>
        acc +
        level.tiles.reduce(
          (acc, tile) => acc + (tile.content === '#' ? 1 : 0),
          0
        ),
      0
    )
  )
})
