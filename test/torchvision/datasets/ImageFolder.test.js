import { describe, expect, test } from "@jest/globals";
import { torchvision } from "../../../src/index";

const { ImageFolder } = torchvision.datasets;

describe("ImageFolder instance creation", () => {
  test("Create ImageFolder object", () => {
    const testFolder = new ImageFolder("./test/resources/dataset");
    expect(testFolder.imgs.length).toEqual(6);
    expect(testFolder.length()).toEqual(6);
    expect(testFolder.classes).toEqual(["a", "b"]);
    expect(testFolder.classToIdx).toEqual({ a: 0, b: 1 });
  });
});
