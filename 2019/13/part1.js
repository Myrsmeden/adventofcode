const fs = require('fs')

const add = (a, b) => a + b

const multi = (a, b) => a * b

const getDigitsAndCode = instruction => {
  if (('' + instruction).length === 1) {
    return [[0, 0, 0, 0, instruction], instruction]
  }

  const digits = ('' + instruction).split('')
  const code = parseInt(
    `${digits[digits.length - 2]}${digits[digits.length - 1]}`
  )

  return [digits, code]
}

const parameterMode = (digits, paramNumber) => {
  try {
    return parseInt(digits[digits.length - paramNumber - 2])
  } catch (e) {
    return 0
  }
}

class Amplifier {
  constructor(phaseSetting, codes) {
    this.phaseSetting = phaseSetting
    this.codes = codes.reduce((acc, code, i) => {
      acc[i] = code
      return acc
    }, {})
    this.halted = false
    this.i = 0
    this.relativeBase = 0
  }

  getParam(digits, codes, i, paramNumber) {
    const mode = parameterMode(digits, paramNumber)
    switch (mode) {
      case 2:
        return codes[this.relativeBase + codes[i + paramNumber] || 0]
      case 1:
        return codes[i + paramNumber] || 0
      case 0:
      default:
        return codes[codes[i + paramNumber]] || 0
    }
  }

  getParamPositional(digits, codes, i, paramNumber) {
    const mode = parameterMode(digits, paramNumber)
    switch (mode) {
      case 2:
        return this.relativeBase + codes[i + paramNumber] || 0
      case 1:
        return i + paramNumber
      case 0:
      default:
        return codes[i + paramNumber]
    }
  }

  run(input) {
    let output = -1
    let n = 0
    while (this.i < Object.keys(this.codes).length) {
      n += 1
      const instruction = this.codes[this.i]
      const [digits, code] = getDigitsAndCode(instruction)
      if (code === 99) {
        this.halted = true
        return output
      }

      if (code === 1) {
        const param1 = this.getParam(digits, this.codes, this.i, 1)

        const param2 = this.getParam(digits, this.codes, this.i, 2)

        const result = add(param1, param2)
        this.codes[
          this.getParamPositional(digits, this.codes, this.i, 3)
        ] = result
        this.i += 4
      }

      if (code === 2) {
        const param1 = this.getParam(digits, this.codes, this.i, 1)
        const param2 = this.getParam(digits, this.codes, this.i, 2)
        const result = multi(param1, param2)
        this.codes[
          this.getParamPositional(digits, this.codes, this.i, 3)
        ] = result
        this.i += 4
      }

      if (code === 3) {
        this.codes[this.getParamPositional(digits, this.codes, this.i, 1)] =
          this.i === 0 ? phaseSetting : input
        this.i += 2
      }

      if (code === 4) {
        output = this.getParamPositional(digits, this.codes, this.i, 1)
        this.i += 2
        return this.codes[output]
      }

      if (code === 5) {
        const param1 = this.getParam(digits, this.codes, this.i, 1)
        if (param1 != 0) {
          this.i = this.getParam(digits, this.codes, this.i, 2)
        } else {
          this.i += 3
        }
      }

      if (code === 6) {
        const param1 = this.getParam(digits, this.codes, this.i, 1)
        if (param1 === 0) {
          this.i = this.getParam(digits, this.codes, this.i, 2)
        } else {
          this.i += 3
        }
      }

      if (code === 7) {
        const param1 = this.getParam(digits, this.codes, this.i, 1)
        const param2 = this.getParam(digits, this.codes, this.i, 2)
        const param3 = this.getParamPositional(digits, this.codes, this.i, 3)
        if (param1 < param2) {
          this.codes[param3] = 1
        } else {
          this.codes[param3] = 0
        }
        this.i += 4
      }

      if (code === 8) {
        const param1 = this.getParam(digits, this.codes, this.i, 1)
        const param2 = this.getParam(digits, this.codes, this.i, 2)
        const param3 = this.getParamPositional(digits, this.codes, this.i, 3)
        if (param1 === param2) {
          this.codes[param3] = 1
        } else {
          this.codes[param3] = 0
        }

        this.i += 4
      }

      if (code === 9) {
        const param1 = this.getParam(digits, this.codes, this.i, 1)
        this.relativeBase += param1
        this.i += 2
      }
    }
  }
}

class Tile {
  constructor(x, y, id) {
    this.x = x
    this.y = y
    this.id = id
  }
}

const tiles = []

fs.readFile('intcodes.txt', 'utf8', (_, data) => {
  const codes = data.split(',').map(x => parseInt(x))

  const amp = new Amplifier(0, codes.slice())
  while (!amp.halted) {

    const x = amp.run(0)
    const y = amp.run(0)
    const id = amp.run(0)
    tiles.push(new Tile(x, y, id))
  }
  console.log(tiles.filter(x => x.id === 2).length)
  return
})
