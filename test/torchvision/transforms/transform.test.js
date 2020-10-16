import { describe, expect, test } from "@jest/globals";
import fs from "fs";
import { torchvision } from "../../../src/index";

const { InvertAxes, Resize, Grayscale, Compose } = torchvision.transforms;

const nj = require("numjs");

const fetchTestImage = () => {
  const buffer = fs.readFileSync("./test/resources/meme.jpg");
  return nj.images.read(buffer);
};

describe("InvertAxes transform test", () => {
  test("Testing InvertAxes call given valid numjs object", () => {
    const image = fetchTestImage();
    expect(new InvertAxes()(image).shape).toEqual([3, 224, 524]);
  });
});

describe("Resize transform test", () => {
  test("Testing Resize call given valid numjs object", () => {
    const image = fetchTestImage();
    expect(new Resize({ height: 224, width: 224 })(image).shape).toEqual([
      224,
      224,
      3,
    ]);
  });
});

describe("Grayscale transform test", () => {
  test("Testing Grayscale call given valid numjs object", () => {
    const image = fetchTestImage();
    expect(new Grayscale()(image).shape).toEqual([224, 524]);
  });
});

describe("Compose transform test", () => {
  test("Testing composed Transform given valid numjs object", () => {
    const image = fetchTestImage();
    const compose = new Compose([
      new Resize({ height: 224, width: 224 }),
      new InvertAxes(),
    ]);
    expect(compose(image).shape).toEqual([3, 224, 224]);
  });
});
