const fs = require('fs')

const add = (a, b) => a + b

const multi = (a, b) => a * b

fs.readFile('input.txt', 'utf8', (_, data) => {
  let codes = data.split(',').map(x => parseInt(x))
  //let codes = [1,0,0,0,99]
  codes[1] = 12
  codes[2] = 2
  for (let i = 0; i < codes.length; i+=4) {
    const code = codes[i]
    if (code === 99) {
      console.log(codes[0])
      return
    }

    if (code === 1) {
      const result = add(codes[codes[i+1]], codes[codes[i+2]])
      codes[codes[i+3]] = result
    }

    if (code === 2) {
      const result = multi(codes[codes[i+1]], codes[codes[i+2]])
      codes[codes[i+3]] = result
    }
  }
})
