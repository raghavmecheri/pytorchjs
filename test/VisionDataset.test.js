import { describe, expect, test, jest } from '@jest/globals'

import torchvision from "../src/torchvision";
const { VisionDataset } = torchvision.datasets;

describe('Ensure that VisionDataset instance cannot be created (abstract class)', () => {
    test('Create VisionDataset object', () => {
        const t = () => new VisionDataset("./tmp", () => {})
        expect(t).toThrow('The abstract VisionDataset class may not be instantiated')
    })
})