import { describe, expect, test } from '@jest/globals'

import { datasets } from "../../../src/torchvision";
const { ImageFolder } = datasets;

describe('ImageFolder instance creation', () => {
    test('Create ImageFolder object', () => {
        const testFolder = new ImageFolder("./test/resources/dataset");
        expect(testFolder.imgs.length).toEqual(6)
        expect(testFolder.length()).toEqual(6)
        expect(testFolder.classes).toEqual(['a', 'b'])
        expect(testFolder.classToIdx).toEqual({ a: 0, b: 1})
    })
})