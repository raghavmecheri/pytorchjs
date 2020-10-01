import Dataset from "../../torch/utils/data/Dataset";

export default class VisionDataset extends Dataset {
    constructor(root, loader, extensions=null, transform=null, targetTransform=null, isValidFile=null) {
        if(new.target === VisionDataset) {
            throw new Error('The abstract VisionDataset class may not be instantiated')
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
    
    getItem = (index) => {
        throw new Error('Function not implemented')
    }

    length = () => {
        throw new Error('Function not implemented')
    }

    findClasses = () => {
        throw new Error('Function not implemented')
    }
}