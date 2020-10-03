/**
 * Collection of utility functions used for Dataset manipulation and management
 * @exports hasFileAllowedExtension Used to check if a file compiles with the allowed extensions
 * @exports makeDataset Create a list of instances in the required format for the DatasetFolder
 */

const { lstatSync, readdirSync, existsSync } = require('fs')
const { join, resolve } = require('path')

/**
 * Helper method used to check if a file has an allowed extension
 * @param {String} filePath The target filepath being loaded
 * @param {[String]} extensions A list of allowed extensions for the filepath
 * @returns {Boolean} Whether the file has an allowed extension or not
 */
export const hasFileAllowedExtension = (filePath, extensions) => extensions.some(extension => filePath.endsWith(extension))

/**
 * Given a root directory of a dataset, iterate over subfolders, and construct the actual dataset while also checking if the files are valid, and if they are allowed
 * @param {String} rootDir Base directory for the dataset
 * @param {{ String: Number }} classToIdx Mapping from class to index
 * @param {[String]} extensions A list of allowed file extensions that may be loaded
 * @param {Function} isValidFile A function to check if a file is valid and is to be loaded
 */
export const makeDataset = (rootDir, classToIdx, extensions=null, isValidFile=null) => {
    var instances = [];
    const absolutePath = resolve(rootDir);
    const bothNone = extensions === null && isValidFile === null;
    const bothSomething = extensions !== null && isValidFile !== null;

    if(bothNone || bothSomething) throw new Error('Both extensions and isValidFile cannot be None or not None at the same time')

    var validFile = isValidFile;

    if(extensions !== null) {
        validFile = (filePath) => hasFileAllowedExtension(filePath, extensions)
    }

    for (const targetClass of Object.keys(classToIdx).sort()) {
        const classIndex = classToIdx[targetClass];
        const targetDir = join(absolutePath, targetClass);
        if (lstatSync(targetDir).isDirectory()) {
            for(const entry of readdirSync(targetDir)) {
                const filePath = join(targetDir, entry)
                if(existsSync(filePath) && validFile(filePath)) {
                    instances.push({ path: filePath, classIndex })
                }
            }
        }
    }

    return instances;
}