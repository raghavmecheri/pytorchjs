import { describe, expect, test } from "@jest/globals";
import { torch } from "../../src/index";

const { Dataset } = torch.utils.data;

describe("Dataset instance creation", () => {
  test("Ensure that Dataset instance cannot be created (abstract class)", () => {
    const t = () => new Dataset();
    expect(t).toThrow("The abstract Dataset class may not be instantiated");
  });
});
