# pytorch-js
<b>This project is currently under development</b>
pytorch-js is an open-source binding of the PyTorch library, allowing developers to run PyTorch models in a Node.js environment

## Examples
Our collection of [examples](./examples) is currently under development.

## Development
This project uses [node-gyp](https://github.com/nodejs/node-gyp) to build a Node.js extension of the PyTorch library. You will also need a
 build of libtorch installed, in the same directory that your project directory exists. 
 * ```npm run install``` should allow you to install project dependancies, and also build the C++ executable.
 * ```npm run build``` to build a new version of the C++ executable
 * ```npm run test``` to run the test suite for this project

## Misc
* [a7ul](https://github.com/a7ul)'s [Guide to writing Node.js addons](https://medium.com/@a7ul/beginners-guide-to-writing-nodejs-addons-using-c-and-n-api-node-addon-api-9b3b718a9a7f) was used as a template to set up this project
