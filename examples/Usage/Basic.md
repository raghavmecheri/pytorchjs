# Using ptjs to run your torchscript models in Node

## Background
This example assumes that you have a pre-trained torch model, that has been exported to [torchscript](https://pytorch.org/tutorials/beginner/Intro_to_TorchScript_tutorial.html), as well as an image dataset conforming to the structure that the ptjs DatasetFolder class expects. The structure may also be found below, for reference, and a sample script to export a torch model to torchscript can be found [here](../Exporting/Exporting.md)

## Required File Structure
```
root/class_x/xxx.ext
root/class_x/xxy.ext
root/class_x/xxz.ext

root/class_y/123.ext
root/class_y/nsdf3.ext
root/class_y/asd932_.ext
```

## Sample Script
### Import Dependancies
```js
import { torch, torchvision } from 'pytorchjs';

const { load } = torch;
const { DataLoader } = torch.utils.data;
const { ImageFolder } = torchvision.datasets;
const { Compose, Resize, InvertAxes } = torchvision.transforms;
```

### Load Model
```js
const squeezeNet = load("squeezenet_ts.pt");
```

### Declare torchvision transforms
Note: The images are resized since the [torchvision Squeezenet model](https://pytorch.org/hub/pytorch_vision_squeezenet/) requires an input of size 224x224
```js
const transforms = new Compose([
  new Resize({height: 224, width: 224}),
  new InvertAxes()
]);
```

### Load data and get inference results
```js
const loader = new DataLoader(new ImageFolder("dataset"), 1, transforms);
const results = await squeezeNet(loader);
```