/**
 * A barebones representation of a Dataset
 */

export default class Dataset {
  /**
   * Create a new Dataset object
   */
  constructor() {
    if (new.target === Dataset) {
      throw new Error("The abstract Dataset class may not be instantiated");
    }
  }
}
