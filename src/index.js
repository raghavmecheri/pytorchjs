/**
 * A module representing ptjs and its components
 * @exports ptjs
 * @author Raghav Mecheri
 */
import torch from "./torch";
import torchvision from "./torchvision";

/**
 * @summary A module representing ptjs and its components
 * @property {Object} torch The ptjs torch module
 * @property {Object} torchvision The ptjs torchvision module
 */

const ptjs = {
  torch,
  torchvision,
};

module.exports = ptjs;
