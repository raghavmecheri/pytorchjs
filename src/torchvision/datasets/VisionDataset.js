import { Dataset } from "../../torch/utils/data";

/**
 * A dataset meant to be utilised for vision tasks
 * @extends Dataset
 */
export class VisionDataset extends Dataset {
  /**
   * Create a new VisionDataset object
   * @param {string} root - The root directory of your target dataset
   * @param {Function} loader - Function to load instances of target files
   * @param {string[]} extensions - A list of accepted extensions
   * @param {Transform} transform - A transform/function used to transform the source datapoints
   * @param {Function} isValidFile - A function call to verify if a file is valid
   */
  constructor(
    root,
    loader,
    extensions = null,
    transform = null,
    isValidFile = null
  ) {
    super();

    if (new.target === VisionDataset) {
      throw new Error(
        "The abstract VisionDataset class may not be instantiated"
      );
    }

    /**
     * A reference to the root directory of the dataset
     * @type {String}
     */
    this.dataset = root;
    /**
     * Function to load files that are being accessed
     * @type {Function}
     */
    this.loader = loader;
    /**
     * A list of accepted extentions
     * @type {String[]}
     */
    this.extensions = extensions;
    /**
     * A transform/function used to transform source components
     * @type {Transform}
     */
    this.transform = transform;
    /**
     * A function to validate if a target file is valid
     * @type {Function}
     */
    this.isValidFile = isValidFile;
  }
}
