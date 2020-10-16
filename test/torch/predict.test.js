import { describe, expect, test } from "@jest/globals";
import { torch, torchvision } from "../../src/index";

const { DataLoader } = torch.utils.data;
const { ImageFolder } = torchvision.datasets;

const { load } = torch;

describe("Torch load function tests", () => {
  test("Call predict on model from valid path", async () => {
    const squeezeNet = load("./test/resources/squeezenet_ts.pt");
    const nClasses = 1000;

    const dataset = new ImageFolder("./test/resources/dataset");
    const loader = new DataLoader(dataset);
    const results = await squeezeNet.predict(loader);

    const evalOutput = (output) => {
      // FIXME - Enforce Softmax, and then check if they add up to 1
      // expect(output.reduce((total, num) => total + num, 0)).toEqual(1);
      expect(output.length).toEqual(nClasses);
    };

    results.forEach((batch) => {
      batch.forEach((output) => {
        evalOutput(output);
      });
    });
  });

  test("Call model object on model from valid path", async () => {
    const squeezeNet = load("./test/resources/squeezenet_ts.pt");
    const nClasses = 1000;

    const dataset = new ImageFolder("./test/resources/dataset");
    const loader = new DataLoader(dataset);
    const results = await squeezeNet(loader);

    const evalOutput = (output) => {
      // FIXME - Enforce Softmax, and then check if they add up to 1
      // expect(output.reduce((total, num) => total + num, 0)).toEqual(1);
      expect(output.length).toEqual(nClasses);
    };

    results.forEach((batch) => {
      batch.forEach((output) => {
        evalOutput(output);
      });
    });
  });
});
