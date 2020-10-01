import { utils } from "../../src/torch";
const { Dataset } = utils.data;

describe('Dataset instance creation', () => {
    test('Ensure that Dataset instance cannot be created (abstract class)', () => {
        const t = () => new Dataset()
        expect(t).toThrow('The abstract Dataset class may not be instantiated')
    })
})