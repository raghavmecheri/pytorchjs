/**
 * Todo: Implement the add function for this class
 */

export default class Dataset {
  constructor() {
    if (new.target === Dataset) {
      throw new Error('The abstract Dataset class may not be instantiated');
    }
  }
    // eslint-disable-next-line
    getItem = (index) => {
      throw new Error('Function not implemented!');
    }
}
