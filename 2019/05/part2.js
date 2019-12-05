const fs = require('fs')

const input = 5

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

fs.readFile('input.txt', 'utf8', (_, data) => {
  let codes = data.split(',').map(x => parseInt(x))
  let i = 0
  while (i < codes.length) {
    const instruction = codes[i]
    const [digits, code] = getDigitsAndCode(instruction)

    if (code === 99) {
      return
    }

    if (code === 1) {
      const param1 = getParam(digits, codes, i, 1)
      const param2 = getParam(digits, codes, i, 2)

      const result = add(param1, param2)
      codes[codes[i + 3]] = result
      i += 4
    }

    if (code === 2) {
      const param1 = getParam(digits, codes, i, 1)
      const param2 = getParam(digits, codes, i, 2)
      const result = multi(param1, param2)
      codes[codes[i + 3]] = result
      i += 4
    }

    if (code === 3) {
      codes[codes[i + 1]] = input
      i += 2
    }

    if (code === 4) {
      console.log(codes[codes[i + 1]])
      i += 2
    }

    if (code === 5) {
      const param1 = getParam(digits, codes, i, 1)
      if (param1 != 0) {
        i = getParam(digits, codes, i, 2)
      } else {
        i += 3
      }
    }

    if (code === 6) {
      const param1 = getParam(digits, codes, i, 1)
      if (param1 === 0) {
        i = getParam(digits, codes, i, 2)
      } else {
        i += 3
      }
    }

    if (code === 7) {
      const param1 = getParam(digits, codes, i, 1)
      const param2 = getParam(digits, codes, i, 2)
      const param3 = codes[i+3]
      if (param1 < param2) {
        codes[param3] = 1
      } else {
        codes[param3] = 0
      }
      i += 4
    }

    if (code === 8) {
      const param1 = getParam(digits, codes, i, 1)
      const param2 = getParam(digits, codes, i, 2)
      const param3 = codes[i+3]
      if (param1 === param2) {
        codes[param3] = 1
      } else {
        codes[param3] = 0
      }
      
      i += 4
    }
  }
})
