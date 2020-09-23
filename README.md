# pytorch-js

<p>
  <img src="https://img.shields.io/github/license/raghavmecheri/coms4995?style=for-the-badge"></img>
</p>

<b>This project is currently under development :)</b><br/><br/>pytorch-js is an open-source binding of the PyTorch library, allowing developers to run PyTorch models in a Node.js environment.

## Examples
Our collection of [examples](./examples) is currently under development.

## Development
This project uses [node-gyp](https://github.com/nodejs/node-gyp) to build a Node.js extension of the PyTorch library. You will also need [a
 build of libtorch](https://pytorch.org/get-started/locally/) installed in the same directory that your project directory exists. 
 * ```npm run install``` should allow you to install project dependancies, and also build the C++ executable.
 * ```npm run build``` to build a new version of the C++ executable
 * ```npm run test``` to run the test suite for this project

## Misc
* Distributed under the MIT license. See [LICENSE](./LICENSE) for more information.
* The original proposal for this project may be found [here](./docs/Proposal.md)
* [a7ul](https://github.com/a7ul)'s [Guide to writing Node.js addons](https://medium.com/@a7ul/beginners-guide-to-writing-nodejs-addons-using-c-and-n-api-node-addon-api-9b3b718a9a7f) was used as a template to set up this project
