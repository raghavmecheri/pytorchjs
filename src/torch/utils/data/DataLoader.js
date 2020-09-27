export default class DataLoader {
    constructor(dataset, batchSize=1, shuffle=false) {
        this.dataset = dataset;
        this.batchSize = this.batchSize;
        this.shuffle = shuffle;
    }
}