import { describe, expect, test } from "@jest/globals";
import { torch, torchvision } from "../../src/index";

const { DataLoader } = torch.utils.data;
const { ImageFolder } = torchvision.datasets;
const { InvertAxes, Resize, Compose } = torchvision.transforms;

const { load } = torch;

describe("Torch load function tests", () => {
  const squeezeNet = load("./test/resources/squeezenet_ts.pt");
  const nClasses = 1000;
  const transform = new Compose([
    new Resize({ height: 224, width: 224 }),
    new InvertAxes(),
  ]);

  const dataset = new ImageFolder("./test/resources/dataset");
  const loader = new DataLoader(dataset, 1, transform);

  test("Call predict on model from valid path", async () => {
    const results = await squeezeNet.predict(loader);
    const evalOutput = (output) => {
      expect(output.length).toEqual(nClasses);
    };

    results.forEach((batch) => {
      batch.forEach((output) => {
        evalOutput(output);
      });
    });
  });

  test("Call model object on model from valid path", async () => {
    const results = await squeezeNet(loader);
    const evalOutput = (output) => {
      expect(output.length).toEqual(nClasses);
    };

    results.forEach((batch) => {
      batch.forEach((output) => {
        evalOutput(output);
      });
    });
  });
});
