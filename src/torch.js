/**
 * PyTorch and it's functions, but in Javascript :)
 * @module torch
 * @memberof ptjs
 */
import { Dataset, DataLoader } from "./torch/utils/data";
import { load } from "./torch/load";

/**
 * A collection of modules to minic torch functionality
 * @property {Object} utils A collection of torch utilities
 * @property {Function} load Utility to load a torchscript model
 */
const torch = {
  /**
   * A collection of torch utils
   * @module torch.utils
   * @property {Object} utils.data A collection of data manipulation utilities
   */
  utils: {
    /**
     * @module torch.utils.data
     * @property {Object} utils.data.Dataset An extendable base Dataset class
     * @property {Object} utils.data.DataLoader A class that allows for in-memory loading of a Dataset for inference
     */
    data: {
      Dataset,
      DataLoader,
    },
  },
  load,
};

module.exports = torch;
