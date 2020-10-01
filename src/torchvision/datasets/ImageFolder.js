import Jimp from 'jimp';

import DatasetFolder from "./DatasetFolder";

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.bmp', '.tif', '.tiff'];

const defaultLoader = (imagePath) => {
    const buffer = fs.readFileSync(imagePath);
    return new Jimp(buffer);
}

export default class ImageFolder extends DatasetFolder {
    constructor(root, loader=defaultLoader, extensions=null, transform=null, targetTransform=null, isValidFile=null) {
        super(root, loader, (isValidFile === null ? IMAGE_EXTENSIONS : null), transform, targetTransform, isValidFile);
        this.imgs = this.samples;
    }
}
