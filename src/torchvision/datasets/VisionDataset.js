import Dataset from "../../torch/utils/data/Dataset";

/**
 * A dataset meant to be utilised for vision tasks
 * @extends Dataset
 */
export default class VisionDataset extends Dataset {
  /**
   * Create a new VisionDataset object
   * @param {string} root - The root directory of your target dataset
   * @param {Function} loader - Function to load instances of target files
   * @param {[string]} extensions - A list of accepted extensions
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

  /**
   * Get an item at a given index from the dataset
   * @param {Number} index - Index to fetch the item from
   */
  // eslint-disable-next-line no-unused-vars
  getItem = (index) => {
    throw new Error("Function not implemented");
  };

  /**
   * Fetch the length of the dataset
   */
  length = () => {
    throw new Error("Function not implemented");
  };

  /**
   * Retrieve the classes present in a dataset
   */
  findClasses = () => {
    throw new Error("Function not implemented");
  };
}
