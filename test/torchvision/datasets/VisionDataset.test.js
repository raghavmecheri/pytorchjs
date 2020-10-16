import { describe, expect, test } from "@jest/globals";
import { torchvision } from "../../../src/index";

const { VisionDataset } = torchvision.datasets;

describe("VisionDataset instance creation", () => {
  test("Ensure that VisionDataset instance cannot be created (abstract class)", () => {
    const t = () => new VisionDataset("./tmp", () => {});
    expect(t).toThrow(
      "The abstract VisionDataset class may not be instantiated"
    );
  });
});
