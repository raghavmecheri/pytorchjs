import Dataset from "../../torch/utils/data/Dataset";

export default class VisionDataset extends Dataset {
    constructor(root, loader, extensions=null, transform=null, targetTransform=null, isValidFile=null) {
        super();
        
        if(new.target === VisionDataset) {
            throw new Error('The abstract VisionDataset class may not be instantiated')
        }

        this.dataset = root;
        this.loader = loader;
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