import functools 

width = 25
height = 6

pixelsPerLayer = width * height

class Layer:
  def __init__(self, data):
    self.data = list(data)
    self.zeros = data.count('0')
    self.ones = data.count('1')
    self.twos = data.count('2')

  def __str__(self):
    s = ''
    for i in range(len(self.data)):
      if i % width == 0:
        s += '\n'
      s += self.data[i]
      
    return s

def createLayers(imageData):
  layers = []
  data = [imageData[i:i+pixelsPerLayer] for i in range(0, len(imageData), pixelsPerLayer)]
  for l in data:
    layers.append(Layer(l))
  return layers

def generateImage(acc, layer):
  for i in range(len(acc.data)):
    if (acc.data[i] == '2'):
      acc.data[i] = layer.data[i]
  return acc

with open('input.txt') as file:
  imageData = file.readline()
  layers = createLayers(imageData)

  finalLayer = functools.reduce(generateImage, layers)
  print(finalLayer)