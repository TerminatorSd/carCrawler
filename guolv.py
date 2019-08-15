# coding=utf-8
# 
# 过滤指定文件夹下小于特定大小或打不开的图片
import os
from os.path import getsize
import cv2

def all_path(dirname):

  # 所有的文件，所有打不开的文件
  result = []
  sumE = 0

  for maindir, subdir, file_name_list in os.walk(dirname):

    # print("1:",maindir) #当前主目录
    # print("2:",subdir) #当前主目录下的所有目录
    # print("3:",file_name_list)  #当前主目录下的所有文件

    for filename in file_name_list:
      # 合并成一个完整路径
      file_path = os.path.join(maindir, filename)

      # 删除小于3K 的图片
      if(getsize(file_path) / 1000 <= 3):
        # os.remove(file_path)
        sumE += 1
        print(file_path, 'size is ' + str(getsize(file_path) / 1000) + 'KB')

      # result.append(file_path)
      else:
        # 删除打不开的图片
        src = cv2.imread(file_path) 
        if(src is None):
          os.remove(file_path)
          sumE += 1
          print(file_path, '打不开')

  print(sumE, '个异常jpg，已删除！')

  # return result

all_path('./dog_img')
# print(all_path('/Users/shaodong/myGit/ganCode/data/ImgNet/dog/folder3/'))
