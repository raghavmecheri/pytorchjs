# ptjs

<p>
  <img src="https://img.shields.io/github/license/raghavmecheri/coms4995?style=for-the-badge"></img>
  <img src="https://img.shields.io/travis/raghavmecheri/ptjs?style=for-the-badge"></img>
  <img src="https://img.shields.io/codecov/c/github/raghavmecheri/ptjs?style=for-the-badge"></img>
</p>

<b>This project is only compatible with models in TorchScript at the moment. Check [this example out](./examples/Exporting.md) to see how you can export your PyTorch model to TorchScript.</b><br/><br/>ptjs is an open-source wrapper of the PyTorch library, allowing developers to run PyTorch models for inference in a Node.js environment.

## Usage
You can run any PyTorch model serialised in TorchScript using ptjs! Here's a basic example.
```js
import { torch, torchvision } from 'ptjs';

const { DataLoader } = torch.utils.data;
const { ImageFolder } = torchvision.datasets;
const { load } = torch;

const squeezeNet = load("./test/resources/squeezenet_ts.pt");
const loader = new DataLoader(new ImageFolder("./test/resources/dataset"));
const results = await squeezeNet(loader);
```
Additional examples of both setup and usage involving features like Transforms (in development) and CUDA (in development) may be found [here](./examples).

## Development
 * ```yarn install``` should allow you to install project dependancies
 * ```yarn test``` to run the test suite for this project

## Misc
* This project uses [arition's fork of torch-js](https://github.com/arition/torch-js) to run TorchScript - check the project out if you're curious about how we do it!
* Distributed under the MIT license. See [LICENSE](./LICENSE) for more information.
* This project was originally developed as a part of [COMSW4995 - Open Source Development](http://www.cs.columbia.edu/~paine/4995/) at [Columbia University](https://www.columbia.edu/). The original proposal for this project may be found [here](./docs/Proposal.md)
