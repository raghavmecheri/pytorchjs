<div align="center">

<img src="https://raw.githubusercontent.com/raghavmecheri/ptjs/master/assets/img/ptjs.png" width="300px">


**Torch and TorchVision, for your Node servers.
Get up and running with PyTorch models within your NodeJS infrastructure in seconds.**

---

<p align="center">
  <a href="#getting-started">Getting Started</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#development">Development</a> •
  <a href="#misc">Misc</a> •
  <a href="#license">License</a>
</p>

[![GA Build Status](https://img.shields.io/github/workflow/status/raghavmecheri/ptjs/Push%20CICD?style=for-the-badge)](https://github.com/raghavmecheri/ptjs/actions)
[![codecov](https://img.shields.io/codecov/c/github/raghavmecheri/ptjs?style=for-the-badge)](https://img.shields.io/codecov/c/github/raghavmecheri/ptjs?style=for-the-badge)
[![npm](https://img.shields.io/npm/v/pytorchjs?style=for-the-badge)](https://www.npmjs.com/package/pytorchjs)
[![releases](https://img.shields.io/github/v/release/raghavmecheri/ptjs?sort=semver&style=for-the-badge)](https://img.shields.io/github/v/release/raghavmecheri/ptjs?sort=semver&style=for-the-badge)
[![license](https://img.shields.io/github/license/raghavmecheri/coms4995?style=for-the-badge)](https://github.com/raghavmecheri/ptjs/blob/master/LICENSE)

</div>

---

## Getting Started
### via yarn
Assuming nothing's broken: `yarn add pytorchjs`

### The same old PyTorch models, in NodeJS
Run your PyTorch models in Javascript, just like you would in Python.
```js
import { torch, torchvision } from 'pytorchjs';

const { load } = torch;
const { DataLoader } = torch.utils.data;
const { ImageFolder } = torchvision.datasets;

const { Compose, Resize, InvertAxes, Normalize } = torchvision.transforms;

const squeezeNet = load("./test/resources/squeezenet_ts.pt");
const transforms = new Compose([
  new Resize({height: 224, width: 224}),
  new Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
  new InvertAxes()
]);

const loader = new DataLoader(new ImageFolder("./test/resources/dataset"), 1, transforms);
const results = await squeezeNet(loader);
```

### More Examples
Additional examples of both setup and usage involving features like Torchvision Transforms and CUDA (in development) may be found [here](https://github.com/raghavmecheri/pytorchjs/tree/master/examples/Usage).

## Key Features
* Run your PyTorch models in a Javascript environment, without worrying about setting up Torchscript or downloading custom binaries
* Deploy your model using configurations identical to what you used during training
* Built-in CUDA support
	* CUDA support is a work in progress
* Support for TorchVision, including transforms, dataset classes, and pre-trained models
	* Support for TorchVision models is a work in progress

## Development
 * ```yarn install``` should allow you to install project dependencies
 * ```yarn test``` to run the test suite for this project

## Misc
* This project uses [arition's fork of torch-js](https://github.com/arition/torch-js) to run TorchScript - check the project out if you're curious about how we do it!
* Distributed under the MIT license. See [LICENSE](./LICENSE) for more information.
* This project was originally developed as a part of [COMSW4995 - Open Source Development](http://www.cs.columbia.edu/~paine/4995/) at [Columbia University](https://www.columbia.edu/).
