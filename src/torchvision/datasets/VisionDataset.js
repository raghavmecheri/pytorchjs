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

    this.dataset = root;
    this.loader = loader;
    this.extensions = extensions;
    this.transform = transform;
    this.isValidFile = isValidFile;
  }
}
