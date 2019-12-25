const fs = require('fs')
class Tile {
  constructor(x, y, content) {
    this.x = x
    this.y = y
    this.content = content
  }
}

const getAdjacentTiles = (tile, tiles) => {
  return [
    tiles.find(t => t.x === tile.x && t.y === tile.y + 1),
    tiles.find(t => t.x === tile.x && t.y === tile.y - 1),
    tiles.find(t => t.x === tile.x + 1 && t.y === tile.y),
    tiles.find(t => t.x === tile.x - 1 && t.y === tile.y)
  ].filter(x => x)
}

const sameTiles = (a, b) => {
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      if (
        a.find(t => t.x === x && t.y === y).content !==
        b.find(t => t.x === x && t.y === y).content
      ) {
        return false
      }
    }
  }

  return true
}

const haveConfiguration = (tileConfigurations, tiles) => {
  const configurationsList = tileConfigurations[tiles[0].content]
  for (let i = 0; i < configurationsList.length; i++) {
    if (sameTiles(configurationsList[i], tiles)) {
      return true
    }
  }
  return false
}

const updateTiles = (tiles, tileConfigurations) => {
  const newTiles = tiles.map((tile, _, tiles) => {
    if (tile.content === '#') {
      if (
        getAdjacentTiles(tile, tiles).filter(t => t.content === '#').length !==
        1
      ) {
        return { ...tile, content: '.' }
      }
      return { ...tile }
    }

    if (
      [1, 2].includes(
        getAdjacentTiles(tile, tiles).filter(t => t.content === '#').length
      )
    ) {
      return { ...tile, content: '#' }
    }

    return { ...tile }
  })

  if (haveConfiguration(tileConfigurations, newTiles)) {
    return newTiles
  }

  tileConfigurations[newTiles[0].content].push(newTiles)

  return updateTiles(newTiles, tileConfigurations)
}

const tileConfigurations = { '#': [], '.': [] }

fs.readFile('input.txt', 'utf8', (_, data) => {
  const tiles = data.split('\n').reduce((acc, line, y) => {
    return line.split('').reduce((acc, tileContent, x) => {
      return acc.concat(new Tile(x, y, tileContent))
    }, acc)
  }, [])
  const firstCycle = updateTiles(tiles, tileConfigurations)
  console.log(firstCycle.reduce((acc, tile) => {
    if (tile.content !== '#') {
      return acc
    }

    return acc + Math.pow(2, tile.x + tile.y*5)
  }, 0))
})
