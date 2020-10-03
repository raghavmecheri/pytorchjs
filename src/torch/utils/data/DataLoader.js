export default class DataLoader {
  constructor(dataset, batchSize = 1, shuffle = false) {
    this.dataset = dataset;
    this.batchSize = batchSize;
    this.shuffle = shuffle;
  }
}
