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

  /**
   * Fetch an item at a given index
   * @param {Number} index - Index to fetch an item at
   * @returns {Object} - Representation of item fetched
   */
  // eslint-disable-next-line
  getItem = (index) => {
    throw new Error("Function not implemented!");
  };
}
