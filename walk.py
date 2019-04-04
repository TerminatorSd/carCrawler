import os

path = './dog_img/'
sum = 0

for maindir, subdir, file_name_list in os.walk(path):
  for file in file_name_list:
    sum += 1

print(sum)
