import { describe, expect, test } from '@jest/globals'

import { datasets } from "../../src/torchvision";
const { ImageFolder } = datasets;

describe('ImageFolder instance creation', () => {
    test('Create ImageFolder object', () => {
        const testFolder = new ImageFolder("./test/resources/dataset");
        expect(testFolder.imgs.length).toEqual(6)
    })
})