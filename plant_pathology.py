from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from datetime import datetime
import pandas as pd
import numpy as np
import os
import re
import sys
import torch
import torchvision
from PIL import Image
import time
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
from torchvision.models.detection import FasterRCNN
from torchvision.models.detection.rpn import AnchorGenerator
from torch.utils.data import DataLoader, Dataset
from torch.utils.data.sampler import SequentialSampler
import shutil
from keras.models import load_model
import cv2
import random
from packaging import version
import warnings
warnings.filterwarnings('ignore')

DIR_INPUT = '/Images'
DIR_TEST = f'{DIR_INPUT}/test'
# Loading the device now
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')

global bboxes
# HELPER FUNCTIONS FOR VIZUALISING / PREDICTING

def get_boxes(tensor,index,score=0.5):

    if index >= len(tensor)  or index<0:
        return 0

    temp_boxes = []
    for i in range(len(tensor[index]['boxes'])):
        if tensor[index]['scores'][i] > score:
            temp_boxes.append(tensor[index]['boxes'][i].cpu().detach().numpy().astype(np.int32))

    return temp_boxes




def load_test_dataset():
    data_path = DIR_TEST
    test_dataset = torchvision.datasets.ImageFolder(
        root=data_path,

        transform=torchvision.transforms.Compose([
            torchvision.transforms.Grayscale(num_output_channels=1),
            torchvision.transforms.ToTensor(),]
    ))

    test_loader = torch.utils.data.DataLoader(
        test_dataset,
        batch_size=1,
        num_workers=1,
        shuffle=False
    )
    return test_loader

def get_test_image(imageName,imageFullPath,imageCropListForSave,itr,score = 0.5):
    image, targets= next(itr)
    sample = image
    image = image.to(device)
    model.eval()
    outputs = model(image)
    outputs = [{k: v.to(device) for k, v in t.items()} for t in outputs]
    boxes = get_boxes(outputs,0,score)

    img = sample[0].permute(1,2,0).cpu().numpy()

    img = np.array(img)
    img = np.reshape(img,(img.shape[1],img.shape[1]))
    imageCropId = 0
    global bboxes
    bboxes = str(boxes)
    for box in boxes:
        x,y,w,h = box
        imageCropId = imageCropId + 1

        #cv2.rectangle(np.float32(img),(int(box[0]), int(box[1])),(int(box[2]), int(box[3])),0, 2)

        im=Image.open(imageFullPath)
        im=im.crop(box)
        imageCropName= imageCropListForSave+ str(imageCropId)+"_" + imageName
        im = im.save(imageCropName)
    #ax.set_axis_off()
    #ax.imshow(img,cmap='gray')

model = torch.load("/AI-PlantPathologyModels/leaves_fasterrcnn_model.pth", map_location={'cuda:0': 'cpu'})
model.to(device)

it = iter(load_test_dataset())
imageCropListForSave = "/Images/croppedImages/"
image_list = DIR_TEST+"/leaf"
for path in os.listdir(image_list):
    imageFullPath = os.path.join(image_list, path)
    if os.path.isfile(imageFullPath):
        imageName=imageFullPath.split("/")[-1]
        try:
            get_test_image(imageName,imageFullPath,imageCropListForSave,it,0.5)
        except Exception as e:
            print(e)
            print( '{ "totalLeafs":"'+str(0)+'", "healthy":"'+str(0)+'", "diseased":"'+str(0)+'", "healthyPercentage":"'+str(0)+'", "diseasedPercentage":"'+str(0)+'"}')
            sys.exit()
###############################################################################################3

# load model
new_model = load_model("/AI-PlantPathologyModels/bestmodel.hdf5")

def imagePreprocess(imageFullPath):
  img=cv2.imread(imageFullPath)
  width = 256
  height = 256
  dim = (width, height)

  # resize image
  resized = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)

  myImage=resized.reshape(-1,256,256,3)
  return myImage



diseasedCounter = 0
healthyCounter = 0
diseasedCounterPer = 0
healthyCounterPer = 0

#predicting a image using the model
categories=["Healthy","Diseased"]

image_list = "/Images/croppedImages/"

for path in os.listdir(image_list):
    imageFullPath = os.path.join(image_list, path)
    if os.path.isfile(imageFullPath):
        preprocessedImage = imagePreprocess(imageFullPath)

        #predicting the class of the image
        predict_class=new_model.predict_classes(preprocessedImage)
        imageCategory = categories[predict_class[0]]
        #print(imageCategory)
        if imageCategory == "Healthy":
           #print("Leaf is Healthy")
           healthyCounter =healthyCounter +1
        else:
           #print("Leaf is Diseased")
           diseasedCounter = diseasedCounter +1


                 #statistics
        pred = new_model.predict(preprocessedImage)
        res = pd.DataFrame()
        res2 = pd.DataFrame()
        res['Healthy'] = pred[:, 0]
        healthyCounterPer = healthyCounterPer + pred[:, 0].round(5)

        res2['Diseased'] = pred[:, 1]
        diseasedCounterPer = diseasedCounterPer + pred[:, 1].round(5)

        #print("-----------------------------------------------------------")
#print(diseasedCounter)
#print(healthyCounter)
#print(diseasedCounterPer)
#print(healthyCounterPer)
totalLeafs = diseasedCounter + healthyCounter
test =0
if(totalLeafs > 0):

  diseasedCounterPer = (float(diseasedCounterPer / totalLeafs))
  healthyCounterPer = (float(healthyCounterPer / totalLeafs))


#print(diseasedCounterPer)
#print(healthyCounterPer)
global bboxes
bboxes = bboxes.replace("array", "")
bboxes = bboxes.replace(", dtype=int32)", "")
bboxes = bboxes.replace("(", "")

results =  '{"bbox":'+str(bboxes)+' ,"totalLeafs":"'+str(totalLeafs)+'", "healthy":"'+str(healthyCounter)+'", "diseased":"'+str(diseasedCounter)+'", "healthyPercentage":"'+str(healthyCounterPer)+'", "diseasedPercentage":"'+str(diseasedCounterPer)+'"}'

print(results)

folder = '/Images/croppedImages/'
for filename in os.listdir(folder):
    file_path = os.path.join(folder, filename)
    try:
        if os.path.isfile(file_path) or os.path.islink(file_path):
            os.unlink(file_path)
        elif os.path.isdir(file_path):
            shutil.rmtree(file_path)
    except Exception as e:
        print('Failed to delete %s. Reason: %s' % (file_path, e))

