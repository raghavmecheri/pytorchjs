import DefaultTransform from "../../../torchvision/transforms/transforms";

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
 * Load your datasets at a given rate in order to perform effective inference
 */
export default class DataLoader {
  /**
   * Create a new DataLoader object
   * @param {Dataset} dataset - Target Dataset object
   * @param {Number} batchSize - Batch size to load datapoints in
   * @param {Transform} transform - Function/Transform to be applied to the loaded data
   */
  constructor(dataset, batchSize = 1, transform = DefaultTransform) {
    this.dataset = dataset;
    this.batchSize = batchSize;
    this.transform = transform;
  }

  /**
   * Fetch an iterator over the dataset
   * @returns {Iterable} - An iterable object that can be used to map over the given Dataset
   */
  getIterator = () => {
    return new _SingleProcessDataloaderIter(this);
  };
}
