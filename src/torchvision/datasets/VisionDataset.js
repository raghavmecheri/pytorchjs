import Dataset from "../../torch/utils/data/Dataset";

const defaultLoader = (path) => {
    throw new Error('Function not implemented yet')
}

export default class VisionDataset extends Dataset {
    constructor(root, loader=defaultLoader, extensions=null, transform=null, targetTransform=null, isValidFile=null) {
        if(this.constructor == "VisionDataset") {
            throw new Error('Abstract classes may not be instantiated')
        }

        this.dataset = root;
        this.loader = loader;
        
        if(extensions || transform || targetTransform || isValidFile) {
            throw new Error('This functionality is to be implemented soon, but has not been completed yet. Please feel free to contribute towards ptjs\'s development if you would like to see this feature in an upcoming release!')
        }
        
        this.extensions = extensions;
        this.transform = transform;
        this.targetTransform = targetTransform;
        this.isValidFile = isValidFile;
    }
    
    getItem = (self, index) => {
        throw new Error('Function not implemented')
    }

    length = () => {
        throw new Error('Function not implemented')
    }

    findClasses = () => {
        throw new Error('Function not implemented')
    }
}