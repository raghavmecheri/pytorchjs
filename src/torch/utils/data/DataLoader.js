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

  _fetch = (startIndex, endIndex) => {
    const targets = this.samples.slice(startIndex, endIndex);
    return targets.map((target) => this.dataset.getItem(target));
  };

  _nextIndex = () => {
    const { index, batchSize } = this;
    this.index += batchSize;
    return { startIndex: index, endIndex: this.index };
  };
}

export default class DataLoader {
  constructor(dataset, batchSize = 1) {
    this.dataset = dataset;
    this.batchSize = batchSize;
  }

  getIterator = () => {
    return _SingleProcessDataloaderIter(this);
  };
}
