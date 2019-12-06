class Object:
  def __init__(self, config):
    values = config.split(')')
    self.name = values[1]
    self.orbitName = values[0]
    self.orbits = None

  def setOrbit(self, o):
    self.orbits = o

  def __str__(self):
    return self.name + '-' + str(self.orbits)

  def getNumOrbits(self):
    o = self 
    n = 1
    while o.orbits != None:
      n += 1
      o = o.orbits
    return n

objects = []

def getObject(objects, name):
  for o in objects:
    if o.name == name:
      return o
  return None

def main():
  with open('input.txt') as file:
    for line in file.readlines():
      o = Object(line.strip())
      objects.append(o)

    for o in objects:
      p = getObject(objects, o.orbitName)
      o.setOrbit(p)

    numOrbits = 0
    for o in objects:
      numOrbits += o.getNumOrbits()

    print(numOrbits)


main()
