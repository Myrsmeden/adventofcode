const fs = require('fs')

const calcFuel = mass => {
  const newMass = Math.floor(mass / 3) - 2

  if (newMass <= 0) {
    return 0
  }
  return newMass + calcFuel(newMass)
}

fs.readFile('input.txt', 'utf8', (_, data) => {
  const masses = data.split('\n')
  const fuels = masses.reduce((acc, mass) => {
    return acc + calcFuel(mass)
  }, 0)
  console.log(fuels)
})
