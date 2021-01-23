# Api call Instructions
In order to run the [Python Script](https://github.com/KyriakosZorbas/DatascienceMscThesis/blob/main/ApiCallPythonScript.py) that communicates with the API the followinf libraries myst be installed:

* [requests](https://pypi.org/project/requests/)

The above library can be installed with the following command:

```sh
$ pip install requests
```

# Example
In order to run the [Python Script](https://github.com/KyriakosZorbas/DatascienceMscThesis/blob/main/ApiCallPythonScript.py) we must provide an image in PNG format we dimentions 1024 x 1024.

```sh
$ python ApiCallPythonScript.py myImage.png 
```
As argument we can give the absolute path of our test Image , or just the name of the image if the script is in the same folder level with our script.

These [images](https://github.com/KyriakosZorbas/DatascienceMscThesis/tree/main/test_images_for_API) can be used as test for the API.

# API Response

If everything work the the API will return a response in Json format like this:

```sh
{ "totalLeafs":"15", "healthy":"7", "diseased":"8", "healthyPercentage":"0.4306392967700958", "diseasedPercentage":"0.5693606734275818"}
```

If an error occured the response will be like this:
```sh
{ "totalLeafs":"0", "healthy":"0", "diseased":"0", "healthyPercentage":"0", "diseasedPercentage":"0"}
```

# Links

Dataset link : https://drive.google.com/file/d/1MfIBwRgeT5sr_O_HfXpLsDQYn4EmxC-J/view?usp=sharing

Trained model link : https://drive.google.com/file/d/1ZLzSKGUG1M4kVuZBkxYufsb2__RpCOuL/view?usp=sharing
