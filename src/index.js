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
