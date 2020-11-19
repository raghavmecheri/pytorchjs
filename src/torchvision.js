/**
 * A module representing torchvision's functionality
 * @module ptjs/torchvision
 * @memberof ptjs
 */

import {
  InvertAxes,
  Resize,
  Grayscale,
  Compose,
  DefaultTransform,
  Normalize,
} from "./torchvision/transforms/transforms";

import { ImageFolder } from "./torchvision/datasets/ImageFolder";
import { DatasetFolder } from "./torchvision/datasets/DatasetFolder";
import { VisionDataset } from "./torchvision/datasets/VisionDataset";

/**
 * @property {Object} transforms A collection of classes in order to enable transforms
 * @property {Object} datasets A collection of classes to represent datasets
 */
const torchvision = {
  /**
   * A collection of classes to enable torchvision transforms
   * @module ptjs/torchvision/transforms
   * @memberof ptjs/torchvision
   * @property {Object} InvertAxes Transform that enables inverting image axes
   * @property {Object} Resize Transform that enables resizing images
   * @property {Object} Grayscale Transform that enables converting images to Greyscale
   * @property {Object} Normalize Transform that enables tensor normalization
   * @property {Object} Compose Transform that enables composition of multiple transforms
   * @property {Object} DefaultTransform Default pass-through transform
   */
  transforms: {
    InvertAxes,
    Resize,
    Grayscale,
    Normalize,
    Compose,
    DefaultTransform,
  },
  /**
   * @module ptjs/torchvision/datasets
   * @memberof ptjs/torchvision
   * @property {Object} ImageFolder Functional class representation of an image dataset
   * @property {Object} DatasetFolder Extendable class representation of a DatasetFolder
   * @property {Object} VisionDataset Extendable base class for a VisionDataset
   */
  datasets: {
    ImageFolder,
    DatasetFolder,
    VisionDataset,
  },
};

module.exports = torchvision;
