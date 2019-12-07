const fs = require('fs')

const getAllPermutations = list => {
  if (list.length < 2) {
    return list
  }

  return list.reduce((acc, firstChar, _, original) => {
    const otherChars = original.filter(item => item !== firstChar)
    const innerPermutations = getAllPermutations(otherChars)
    return [
      ...acc,
      ...innerPermutations.map(permutation => [firstChar, ...permutation])
    ]
  }, [])
}

const add = (a, b) => a + b

const multi = (a, b) => a * b

const parameterMode = (digits, paramNumber) => {
  try {
    return parseInt(digits[digits.length - paramNumber - 2])
  } catch (e) {
    return 0
  }
}

const getParam = (digits, codes, i, paramNumber) => {
  return parameterMode(digits, paramNumber) === 1
    ? codes[i + paramNumber]
    : codes[codes[i + paramNumber]]
}

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

class Amplifier {
  constructor(phaseSetting, codes) {
    this.phaseSetting = phaseSetting
    this.codes = codes
    this.halted = false
    this.i = 0
  }

  run(input) {
    let output = -1
    while (this.i < this.codes.length) {
      const instruction = this.codes[this.i]
      const [digits, code] = getDigitsAndCode(instruction)

      if (code === 99) {
        this.halted = true
        return output
      }

      if (code === 1) {
        const param1 = getParam(digits, this.codes, this.i, 1)
        const param2 = getParam(digits, this.codes, this.i, 2)

        const result = add(param1, param2)
        this.codes[this.codes[this.i + 3]] = result
        this.i += 4
      }

      if (code === 2) {
        const param1 = getParam(digits, this.codes, this.i, 1)
        const param2 = getParam(digits, this.codes, this.i, 2)
        const result = multi(param1, param2)
        this.codes[this.codes[this.i + 3]] = result
        this.i += 4
      }

      if (code === 3) {
        this.codes[this.codes[this.i + 1]] =
          this.i === 0 ? this.phaseSetting : input
        this.i += 2
      }

      if (code === 4) {
        output = this.codes[this.codes[this.i + 1]]
        this.i += 2
        return output
      }

      if (code === 5) {
        const param1 = getParam(digits, this.codes, this.i, 1)
        if (param1 != 0) {
          this.i = getParam(digits, this.codes, this.i, 2)
        } else {
          this.i += 3
        }
      }

      if (code === 6) {
        const param1 = getParam(digits, this.codes, this.i, 1)
        if (param1 === 0) {
          i = getParam(digits, this.codes, this.i, 2)
        } else {
          this.i += 3
        }
      }

      if (code === 7) {
        const param1 = getParam(digits, this.codes, this.i, 1)
        const param2 = getParam(digits, this.codes, this.i, 2)
        const param3 = this.codes[this.i + 3]
        if (param1 < param2) {
          this.codes[param3] = 1
        } else {
          this.codes[param3] = 0
        }
        this.i += 4
      }

      if (code === 8) {
        const param1 = getParam(digits, this.codes, this.i, 1)
        const param2 = getParam(digits, this.codes, this.i, 2)
        const param3 = this.codes[this.i + 3]
        if (param1 === param2) {
          this.codes[param3] = 1
        } else {
          this.codes[param3] = 0
        }

        this.i += 4
      }
    }
  }
}

fs.readFile('input.txt', 'utf8', (_, data) => {
  const codes = data.split(',').map(x => parseInt(x))
  const possibleSettings = getAllPermutations(['5', '6', '7', '8', '9'])

  const output = possibleSettings.reduce((bestOutput, phaseSettings) => {
    const amplifiers = phaseSettings.map(phaseSetting => {
      return new Amplifier(parseInt(phaseSetting), codes.slice())
    })
    let output = 0
    while (!amplifiers.reduce((acc, amp) => acc || amp.halted, false)) {
      for (let j = 0; j < amplifiers.length; j++) {
        const amplifier = amplifiers[j]
        let newOutput = amplifier.run(output)
        if (!amplifier.halted) {
          output = newOutput
        } else {
          return Math.max(output, bestOutput)
        }
      }
    }
    return Math.max(output, bestOutput)
  }, 0)

  console.log(output)
})
