import VisionDataset from "./VisionDataset";

import { makeDataset } from "./utilities";

const { lstatSync, readdirSync } = require("fs");
const { join, resolve } = require("path");

/**
 * A representation of a PyTorch Dataset folder class.
 * Dervied from: https://pytorch.org/docs/stable/_modules/torchvision/datasets/folder.html#DatasetFolder
 * @extends VisionDataset
 */
export default class DatasetFolder extends VisionDataset {
  /**
   * Create a new Dataset folder object
   * @param {string} root - Root directory to Dataset Folder
   * @param {Function} loader - Function used to load files in root folder
   * @param {[string]} extensions - Accepted extensions for loading
   * @param {Object} transform - Transform object to apply to every object
   * @param {Function} isValidFile - Function to validate if a file is valid or not
   */
  constructor(
    root,
    loader,
    extensions = null,
    transform = null,
    isValidFile = null
  ) {
    super(root, loader, extensions, transform, isValidFile);
    this.findClasses();

    const samples = makeDataset(
      root,
      this.classToIdx,
      this.extensions,
      this.isValidFile
    );

    this.samples = samples;
    this.targets = samples.map((entry) => entry[1]);
  }

  /**
   * Given an index of an item, retrieve the sample, load it up, and potentially transform it if needed
   * @param {Number} index The index of the sample being fetched
   * @returns {{sample: File, target: Number}} An object containing the sample being loaded, along with its class index
   */
  getItem = (index) => {
    const { path, classIndex } = this.samples[index];
    let sample = this.loader(path);

    if (this.transform !== null) {
      sample = this.transform(sample);
    }

    return { sample, target: classIndex };
  };

  /**
   * Fetch the number of samples being accessed
   * @returns {Number} The length of the samples array
   *
   */
  length = () => this.samples.length;

  /**
   * Find the number of classes present given a root dataset
   * @returns {{classes: [String], classToIdx: { String: Number }}} An array of the classes present in the root directory, as well as a mapping from class to index
   */
  findClasses = () => {
    const isDirectory = (source) => lstatSync(source).isDirectory();

    const getDirectories = (source) => {
      const directories = [];
      const results = readdirSync(source);

      results.forEach((result) => {
        if (isDirectory(join(source, result))) {
          directories.push(result);
        }
      });

      return directories;
    };

    const rootDir = resolve(this.dataset);
    const classes = getDirectories(rootDir);
    const classToIdx = {};
    classes.forEach((className, index) => {
      classToIdx[className] = index;
    });

    this.classes = classes;
    this.classToIdx = classToIdx;
  };
}
