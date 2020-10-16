# ptjs

<p>
  <img src="https://img.shields.io/github/license/raghavmecheri/coms4995?style=for-the-badge"></img>
  <img src="https://img.shields.io/travis/raghavmecheri/ptjs?style=for-the-badge"></img>
  <img src="https://img.shields.io/codecov/c/github/raghavmecheri/ptjs?style=for-the-badge"></img>
</p>

<b>This project is in development and is currently only compatible with models in TorchScript. Check [this example out](./examples/Exporting.md) to see how you can export your PyTorch model to TorchScript.</b><br/><br/>ptjs is an open-source wrapper of the PyTorch library, allowing developers to run PyTorch models for inference in a Node.js environment.

## Examples
Our collection of [examples](./examples) is currently under development.

## Development
 * ```yarn install``` should allow you to install project dependancies
 * ```yarn test``` to run the test suite for this project

## Misc
* This project uses [arition's fork of torch-js](https://github.com/arition/torch-js) to run TorchScript modules - check the project out if you're curious about how we do it!
* Distributed under the MIT license. See [LICENSE](./LICENSE) for more information.
* The original proposal for this project may be found [here](./docs/Proposal.md)
