class Object:
  def __init__(self, config):
    values = config.split(')')
    self.name = values[1]
    self.orbitName = values[0]
    self.orbits = None

  def setOrbit(self, o):
    self.orbits = o

  def getTotalOrbit(self):
    o = self
    l = []
    while o.orbits != None:
      l.append(o.name)
      o = o.orbits
    l.append(o.name)
    return l

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

def intersection(lst1, lst2): 
  return list(set(lst1) & set(lst2)) 

def main():
  with open('input.txt') as file:
    for line in file.readlines():
      o = Object(line.strip())
      objects.append(o)

    for o in objects:
      p = getObject(objects, o.orbitName)
      o.setOrbit(p)

    santa = getObject(objects, 'SAN')
    me = getObject(objects, 'YOU')

    santaOrbit = santa.getTotalOrbit()
    meOrbit = me.getTotalOrbit()

    common = intersection(santaOrbit, meOrbit)

    minDistance = 0
    c = 0

    for x in common:
      y = getObject(objects, x)
      orbs = y.getNumOrbits()
      if orbs > minDistance:
        minDistance = orbs
        c = x

    count = 0
    for x in santaOrbit:
      if x == c:
        break 
      count += 1

    for x in meOrbit:
      if x == c:
        break 
      count += 1
    print(count-2)

main()
