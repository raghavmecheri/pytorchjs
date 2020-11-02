/**
 * PyTorch and it's functions, but in Javascript :)
 * @module ptjs/torch
 * @memberof ptjs
 */
import { Dataset, DataLoader } from "./torch/utils/data";
import { load } from "./torch/load";
import { Model } from "./torch/model";

/**
 * A collection of modules to minic torch functionality
 * @property {Object} utils A collection of torch utilities
 * @property {Function} load Utility to load a torchscript model
 * @property {class} Model A class representing a ptjs model
 */
const torch = {
  /**
   * A collection of torch utils
   * @module ptjs/torch/utils
   * @memberof ptjs/torch
   * @property {Object} utils.data A collection of data manipulation utilities
   */
  utils: {
    /**
     * @module ptjs/torch/utils/data
     * @memberof ptjs/torch/utils
     * @property {Object} utils.data.Dataset An extendable base Dataset class
     * @property {Object} utils.data.DataLoader A class that allows for in-memory loading of a Dataset for inference
     */
    data: {
      Dataset,
      DataLoader,
    },
  },
  load,
  Model,
};

module.exports = torch;
