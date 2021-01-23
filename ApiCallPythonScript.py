#!/usr/bin/python

import requests
import json
import sys
import base64

try:
   imagePath = sys.argv[1]
except:
  print("Please provide the path of an Image")
  sys.exit(0)

print("processing image : " +str(imagePath))

try:
  with open(imagePath, "rb") as img_file:
      my_string = base64.b64encode(img_file.read())



except:
  print("Please provide a valid image")
  sys.exit(0)


base64Image = "data:image/png;base64,"+my_string.decode('utf-8')

data = {'base64Image': base64Image}
json.dumps(data)


url = 'http://dev.scio.services:7001/sso'
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
response = requests.post(url, data=json.dumps(data), headers=headers)

print(response.text)
