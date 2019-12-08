width = 25
height = 6

pixelsPerLayer = width * height

class Layer:
  def __init__(self, data):
    self.data = data
    self.zeros = data.count('0')
    self.ones = data.count('1')
    self.twos = data.count('2')

def createLayers(imageData):
  layers = []
  data = [imageData[i:i+pixelsPerLayer] for i in range(0, len(imageData), pixelsPerLayer)]
  for l in data:
    layers.append(Layer(l))
  return layers

with open('input.txt') as file:
  imageData = file.readline()
  layers = createLayers(imageData)
  bestLayer =  layers[0] 
  numZeros = layers[0].zeros
  for i in range(1, len(layers)):
    if layers[i].zeros < numZeros:
      numZeros = layers[i].zeros
      bestLayer = layers[i]

  print(bestLayer.ones * bestLayer.twos)