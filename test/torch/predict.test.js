import { describe, expect, test } from "@jest/globals";

import { load, utils } from "../../src/torch";
import { datasets } from "../../src/torchvision";

const { DataLoader } = utils.data;
const { ImageFolder } = datasets;

describe('Torch load function tests', () =>  {
    test('Call predict on model from valid path', async () => {
        const squeezeNet = load("./test/resources/squeezenet_ts.pt");
        const nClasses = 1000;

        const dataset = new ImageFolder("./test/resources/dataset");
        const loader = new DataLoader(dataset);
        const results = await squeezeNet.predict(loader);

        const evalOutput = (output) => {
            // FIXME - Enforce Softmax, and then check if they add up to 1
            // expect(output.reduce((total, num) => total + num, 0)).toEqual(1);
            expect(output.length).toEqual(nClasses);
        }

        results.forEach(batch => {
            batch.forEach(output => {
                evalOutput(output);
            })
        })
    })
})