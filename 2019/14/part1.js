const fs = require('fs')

class Chemical {
  constructor(name, quantity) {
    this.name = name
    this.quantity = parseInt(quantity)
  }
}

class Reaction {
  constructor(inputs, outputs) {
    this.inputs = inputs.map(([quantity, name]) => new Chemical(name, quantity))
    this.outputs = new Chemical(outputs[1], outputs[0])
  }
}

const getMaterialTree = (reaction, reactions, timesNeeded) => {
  if (reaction.inputs[0].name === 'ORE') {
    console.log('Down to ore')
    console.log(timesNeeded * reaction.inputs[0].quantity)
    return reaction
  }
  return reaction.inputs.reduce((acc, c) => {
    console.log(c)
    const subReaction = reactions.find(r => r.outputs.name === c.name)
    const subReactionQuantity = subReaction.outputs.quantity
    const timesNeeded = Math.ceil(c.quantity / subReactionQuantity)
    console.log(getMaterialTree(subReaction, reactions, timesNeeded))
    return [...acc, getMaterialTree(subReaction, reactions, timesNeeded)]
  }, [])
}

fs.readFile('input.txt', 'utf8', (_, data) => {
  const reactions = data.split('\n').reduce((acc, line) => {
    const [rawInputs, rawOutputs] = line.split(' => ')
    const inputs = rawInputs
      .split(', ')
      .reduce((acc, item) => [...acc, item.split(' ')], [])
    const outputs = rawOutputs.split(' ')
    return [...acc, new Reaction(inputs, outputs)]
  }, [])
  const fuelReaction = reactions.find(r =>  r.outputs.name === 'FUEL')
  const materials = getMaterialTree(fuelReaction, reactions, 1)
  console.log(materials)
})
