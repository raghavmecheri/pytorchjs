import { describe, expect, test } from '@jest/globals'

import { datasets } from "../../../src/torchvision";
const { VisionDataset } = datasets;

describe('VisionDataset instance creation', () => {
    test('Ensure that VisionDataset instance cannot be created (abstract class)', () => {
        const t = () => new VisionDataset("./tmp", () => {})
        expect(t).toThrow('The abstract VisionDataset class may not be instantiated')
    })
})