const fs = require('fs')

fs.readFile('input.txt', 'utf8', (_, data) => {
  const masses = data.split('\n')
  const fuels = masses.reduce((acc, mass) => {
    return acc + (Math.floor(mass / 3) - 2)
  }, 0)
  console.log(fuels)
})
