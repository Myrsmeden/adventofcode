start = 109165
#end = 123456
end = 576723

def get_num(num, index):
  try:
    return num[index]
  except:
    return -1

def two_digits_are_the_same(number):
  num = str(number)
  length = len(num)
  for i in range(0, length-1):
    if num[i] == num[i+1] and get_num(num, i-1) != num[i] and  get_num(num, i+2) != num[i]:

      return True
  return False

def no_decreasing(number):
  num = str(number)
  length = len(num)
  for i in range(0, length-1):
    if num[i] > num[i+1]:
      return False
  return True

def is_password(number):
  return two_digits_are_the_same(number) and no_decreasing(number)

number_of_combinations = 0

for i in range(start, end + 1):
  if is_password(i):
    number_of_combinations += 1

print(number_of_combinations)
