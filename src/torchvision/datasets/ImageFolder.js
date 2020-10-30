import fs from "fs";
import { DatasetFolder } from "./DatasetFolder";

const nj = require("numjs");

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff"];

const defaultLoader = (imagePath) => {
  const buffer = fs.readFileSync(imagePath);
  return nj.images.read(buffer);
};

/**
 * A representation of an Image Dataset (derived from PyTorch's ImageFolder: https://pytorch.org/docs/stable/torchvision/datasets.html#torchvision.datasets.ImageFolder)
 * @extends DatasetFolder
 */
export class ImageFolder extends DatasetFolder {
  /**
   * Create a new ImageFolder object
   * @param {string} root - The root directory to the target dataset
   * @param {Function} [defaultLoader] loader - A custom function used to load images for the ImageFolder
   * @param {Transform} [null] transform - A transform/function used to transform source images
   * @param {Function} [null] isValidFile - Function to verifty whether a valid file is valid
   */
  constructor(
    root,
    loader = defaultLoader,
    transform = null,
    isValidFile = null
  ) {
    super(
      root,
      loader,
      isValidFile === null ? IMAGE_EXTENSIONS : null,
      transform,
      isValidFile
    );
    this.imgs = this.samples;
  }
}
