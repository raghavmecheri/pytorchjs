/**
 * A module representing pytorchjs and its components
 * @exports pytorchjs
 * @author Raghav Mecheri
 */
import torch from "./torch";
import torchvision from "./torchvision";

/**
 * @summary A module representing pytorchjs and its components
 * @property {Object} torch The pytorchjs torch module
 * @property {Object} torchvision The pytorchjs torchvision module
 */

const pytorchjs = {
  torch,
  torchvision,
};

module.exports = pytorchjs;
