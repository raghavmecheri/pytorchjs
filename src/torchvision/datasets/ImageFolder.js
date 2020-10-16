import fs from 'fs';
import DatasetFolder from './DatasetFolder';

const nj = require('numjs');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.bmp', '.tif', '.tiff'];

const defaultLoader = (imagePath) => {
  const buffer = fs.readFileSync(imagePath);
  return nj.images.read(buffer);
};

export default class ImageFolder extends DatasetFolder {
  constructor(root, loader = defaultLoader, transform = null, targetTransform = null, isValidFile = null) {
    super(root, loader, (isValidFile === null ? IMAGE_EXTENSIONS : null), transform, targetTransform, isValidFile);
    this.imgs = this.samples;
  }
}
