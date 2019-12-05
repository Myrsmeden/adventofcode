const fs = require('fs')

const add = (a, b) => a + b

const multi = (a, b) => a * b

const expectedOutput = 19690720

const reset = (codes, noun, verb) => {
  return [codes[0], noun, verb, ...codes.slice(3)]
}

const getResult = codes => {
  for (let i = 0; i < codes.length; i += 4) {
    const code = codes[i]
    if (code === 99) {
      return codes[0]
    }

    if (code === 1) {
      const result = add(codes[codes[i + 1]], codes[codes[i + 2]])
      codes[codes[i + 3]] = result
    }

    if (code === 2) {
      const result = multi(codes[codes[i + 1]], codes[codes[i + 2]])
      codes[codes[i + 3]] = result
    }
  }
}

fs.readFile('input.txt', 'utf8', (_, data) => {
  const original = data.split(',').map(x => parseInt(x))
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const codes = reset(original, noun, verb)
      const result = getResult(codes)
      if (result === expectedOutput) {
        console.log(100 * noun + verb)
        return
      }
    }
  }
})
