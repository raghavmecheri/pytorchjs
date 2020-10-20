import { describe, expect, test } from "@jest/globals";
import fs from "fs";
import { torchvision } from "../../../src/index";

const {
  InvertAxes,
  Resize,
  Grayscale,
  Compose,
  DefaultTransform,
} = torchvision.transforms;

const nj = require("numjs");

const fetchTestImage = () => {
  const buffer = fs.readFileSync("./test/resources/meme.jpg");
  return {
    image: nj.images.read(buffer),
    height: 224,
    width: 524,
    channels: 3,
  };
};

describe("InvertAxes transform test", () => {
  test("Testing InvertAxes call given valid numjs object", () => {
    const { image, height, width, channels } = fetchTestImage();
    expect(new InvertAxes()(image).shape).toEqual([channels, height, width]);
  });
});

describe("Resize transform test", () => {
  test("Testing Resize call given valid numjs object", () => {
    const { image, channels } = fetchTestImage();
    expect(new Resize({ height: 224, width: 224 })(image).shape).toEqual([
      224,
      224,
      channels,
    ]);
  });
});

describe("Grayscale transform test", () => {
  test("Testing Grayscale call given valid numjs object", () => {
    const { image, height, width } = fetchTestImage();
    expect(new Grayscale()(image).shape).toEqual([height, width]);
  });
});

describe("DefaultTransform transform test", () => {
  test("Testing default call given valid numjs object", () => {
    const { image, height, width, channels } = fetchTestImage();
    expect(new DefaultTransform()(image).shape).toEqual([
      height,
      width,
      channels,
    ]);
  });
});

describe("Compose transform test", () => {
  test("Testing composed Transform given valid numjs object", () => {
    const { image, channels } = fetchTestImage();
    const compose = new Compose([
      new Resize({ height: 224, width: 224 }),
      new InvertAxes(),
    ]);
    expect(compose(image).shape).toEqual([channels, 224, 224]);
  });
});
