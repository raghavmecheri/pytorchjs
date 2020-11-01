class _BaseDataLoaderIter {
  constructor(dataloader) {
    this.dataset = dataloader.dataset;
    this.batchSize = dataloader.batchSize;
    this.samples = dataloader.dataset.samples;
  }
}

class _SingleProcessDataloaderIter extends _BaseDataLoaderIter {
  constructor(dataloader) {
    super(dataloader);
    this.index = 0;
  }

  nextData = () => {
    const { startIndex, endIndex } = this._nextIndex();
    const data = this._fetch(startIndex, endIndex);
    return data;
  };

  hasNext = () => {
    return this.index < this.samples.length;
  };

  _fetch = (startIndex, endIndex) => {
    const targets = this.samples.slice(startIndex, endIndex);
    const data = [];
    let i = 0;
    while (i < targets.length) {
      data.push(this.dataset.getItem(i));
      i += 1;
    }
    return data;
  };

  _nextIndex = () => {
    const { index, batchSize } = this;
    this.index += batchSize;
    return { startIndex: index, endIndex: this.index };
  };
}

/**
 * A barebones representation of a Dataset
 */
export class Dataset {
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

/**
 * Load your datasets at a given rate in order to perform effective inference
 */
export class DataLoader {
  /**
   * Create a new DataLoader object
   * @param {Dataset} dataset - Target Dataset object
   * @param {Number} [1] batchSize - Batch size to load datapoints in
   * @param {Transform} [null] transform - Function/Transform to be applied to the loaded data. If a transform is passed here, the transform associated with the Dataset is overriden.
   */
  constructor(dataset, batchSize = 1, transform = null) {
    this.dataset = dataset;
    if (transform !== null) {
      this.dataset.transform = transform;
    }
    this.batchSize = batchSize;
  }

  /**
   * Fetch an iterator over the dataset
   * @returns {Iterable} - An iterable object that can be used to map over the given Dataset
   */
  getIterator = () => {
    return new _SingleProcessDataloaderIter(this);
  };
}
