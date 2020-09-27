import VisionDataset from "./VisionDataset";

/**
 * Inspired by: https://pytorch.org/docs/stable/_modules/torchvision/datasets/folder.html#DatasetFolder
 */
export default class DatasetFolder extends VisionDataset {
    constructor(root, loader, extensions=null, transform=null, targetTransform=null, isValidFile=null) {
        super(root, loader, extensions, transform, targetTransform, isValidFile)
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
