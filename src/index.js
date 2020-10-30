/**
 * Torch and TorchVision, for your Node servers. Get up and running with PyTorch models within your NodeJS infrastructure in seconds.
 * @exports torch
 * @exports torchvision
 */

import utils from "./torch/utils/utils";
import load from "./torch/load";
import transforms from "./torchvision/transforms/transforms";
import datasets from "./torchvision/datasets/datasets";

const torch = {
  utils,
  load,
};

const torchvision = {
  transforms,
  datasets,
};

module.exports = {
  torch,
  torchvision,
};
