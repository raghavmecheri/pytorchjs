import { describe, expect, test } from "@jest/globals";
import { torch } from "../../src/index";

const { Model } = torch;

describe("Torch load function tests", () => {
  test("Load model from valid path with no exception", () => {
    const model = new Model("./test/resources/squeezenet_ts.pt");
    expect(model).toEqual(expect.anything());
  });

  test("Model.eval call for string representation", () => {
    const model = new Model("./test/resources/squeezenet_ts.pt");
    expect(model.eval()).toEqual(expect.anything());
  });

  test("Call model.predict with non-dataloader", async () => {
    const model = new Model("./test/resources/squeezenet_ts.pt");
    await model.predict({}).catch((e) => {
      expect(e.message).toEqual(
        "You can only call a model object with an instance of the torch.utils.data.DataLoader class!"
      );
    });
  });
});
