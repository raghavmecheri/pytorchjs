/**
 * Todo: Implement the add function for this class
 */
export default class Dataset {
    constructor() {
        if(this.constructor == "Dataset") {
            throw new Error('Abstract classes may not be instantiated')
        }
    }

    getItem = (self, index) => {
        throw new Error('Function not implemented!')
    }
}