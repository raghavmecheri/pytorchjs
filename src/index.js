/**
 * Torch and TorchVision, for your Node servers. Get up and running with PyTorch models within your NodeJS infrastructure in seconds.
 */

import { Dataset, DataLoader } from "./torch/utils/data";
import load from "./torch/load";
import transforms from "./torchvision/transforms/transforms";
import datasets from "./torchvision/datasets/datasets";

// Efforts have been made to retain a similarily to torch and torchvision with regards to package structure :)

const utils = {
  data: {
    Dataset,
    DataLoader,
  },
};

/**
 * A collection of modules to minic PyTorch functionality - contains the utils and load modules.
 */
export const torch = {
  utils,
  load,
};

/**
 * A collection of modules to minic Torchvision functionality - constaints the transforms and datasets modules
 */
export const torchvision = {
  transforms,
  datasets,
};
