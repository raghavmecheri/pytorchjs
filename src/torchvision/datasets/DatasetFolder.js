const { lstatSync, readdirSync } = require('fs')
const { join, resolve } = require('path')

import VisionDataset from "./VisionDataset";
import { makeDataset } from "./utilities"


/**
 * Dervied from: https://pytorch.org/docs/stable/_modules/torchvision/datasets/folder.html#DatasetFolder
 */
export default class DatasetFolder extends VisionDataset {
    constructor(root, loader, extensions=null, transform=null, targetTransform=null, isValidFile=null) {
        super(root, loader, extensions, transform, targetTransform, isValidFile)
        const { classes, classToIdx } = this.findClasses();

        const samples = makeDataset(root, classToIdx, this.extensions, this.isValidFile);

        this.classes = classes;
        this.classToIdx = classToIdx;
        this.samples = samples;
        this.targets = samples.map((entry) => entry[1])
    }
    
    /**
     * Given an index of an item, retrieve the sample, load it up, and potentially transform it if needed
     * @param {*} index The index of the sample being fetched
     * @returns {{sample: File, target: Number}} An object containing the sample being loaded, along with its class index
     */
    getItem = (index) => {
        const { path, classIndex } = this.samples[index];
        var sample = self.loader(path);
        
        if(self.transform !== null) {
            sample = self.transform(sample)
        }

        if(self.targetTransform !== null) {
            sample = self.targetTransform(sample)
        }

        return { sample, target: classIndex }
    }

    /**
     * Fetch the number of samples being accessed
     * @returns {Number} The length of the samples array
     * 
     */
    length = () => {
        return this.samples.length;
    }

    /**
     * Find the number of classes present given a root dataset
     * @returns {{classes: [String], classToIdx: { String: Number }}} An array of the classes present in the root directory, as well as a mapping from class to index
     */
    findClasses = () => {
        const isDirectory = source => lstatSync(source).isDirectory();
        
        const getDirectories = (source) => {
            var directories = [];
            const results = readdirSync(source);

            for(const result of results) {
                if(isDirectory(join(source, result))) {
                    directories.push(result);
                }
            }

            return directories
        }

        const rootDir = resolve(this.dataset);
        const classes = getDirectories(rootDir);
        var classToIdx = {};
        classes.map((className, index) => classToIdx[className] = index); 
        return { classes, classToIdx };
    }
}
