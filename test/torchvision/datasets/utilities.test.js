import { describe, expect, test } from "@jest/globals";

import {
  makeDataset,
  hasFileAllowedExtension,
} from "../../../src/torchvision/datasets/utilities";

describe("hasFileAllowedExtension expected functionality", () => {
  test("File allowed with valid extension from given list of extensions", () => {
    expect(
      hasFileAllowedExtension("test.jpg", [".jpg", ".png", ".tiff"])
    ).toEqual(true);
  });

  test("File not allowed with invalid extension given a list of extensions", () => {
    expect(
      hasFileAllowedExtension("test.jpeg", [".jpg", ".png", ".tiff"])
    ).toEqual(false);
  });

  test("File not allowed with no extension given a list of extensions", () => {
    expect(hasFileAllowedExtension("test", [".jpg", ".png", ".tiff"])).toEqual(
      false
    );
  });

  test("File not allowed given an empty list", () => {
    expect(hasFileAllowedExtension("test.jpg", [])).toEqual(false);
  });

  test("File not allowed with no extension given an empty list", () => {
    expect(hasFileAllowedExtension("test", [])).toEqual(false);
  });
});

describe("makeDataset expected functionality", () => {
  test("Create valid instances array given a valid directory, and extensions defined", () => {
    const instances = makeDataset("test/resources/dataset", { a: 0, b: 1 }, [
      ".jpg",
      ".png",
    ]);
    expect(instances.length).toEqual(6);
  });

  test("Create valid instances array given a valid directory, and isValidFile defined", () => {
    const allInstances = makeDataset(
      "test/resources/dataset",
      { a: 0, b: 1 },
      null,
      () => true
    );
    const partialInstances = makeDataset(
      "test/resources/dataset",
      { a: 0, b: 1 },
      null,
      (fileName) => fileName.endsWith(".png")
    );
    expect(allInstances.length).toEqual(6);
    expect(partialInstances.length).toEqual(3);
  });

  test("Create valid instances array given a valid directory, either extensions or isValidFile defined", () => {
    expect(() =>
      makeDataset("test/resources/dataset", { a: 0, b: 1 }, null, null)
    ).toThrow(
      "Both extensions and isValidFile cannot be None or not None at the same time"
    );
  });

  test("Create valid instances array given a valid directory, both extensions and isValidFile defined", () => {
    expect(() =>
      makeDataset(
        "test/resources/dataset",
        { a: 0, b: 1 },
        ["test"],
        () => true
      )
    ).toThrow(
      "Both extensions and isValidFile cannot be None or not None at the same time"
    );
  });

  test("Create valid instances array given an invalid directory, and extensions defined", () => {
    expect(() =>
      makeDataset("missing/", { a: 0, b: 1 }, [".jpg", ".png"])
    ).toThrow(
      new RegExp("ENOENT: no such file or directory, lstat '.*(/|\\\\)a'")
    );
  });

  test("Create valid instances array given a valid directory, and no extensions defined", () => {
    const instances = makeDataset("test/resources/dataset", { a: 0, b: 1 }, []);
    expect(instances.length).toEqual(0);
  });

  test("Create valid instances array given a valid directory, and partially wrong extensions defined", () => {
    const instances = makeDataset("test/resources/dataset", { a: 0, b: 1 }, [
      ".jpeg",
      ".png",
    ]);
    expect(instances.length).toEqual(3);
  });

  test("Create valid instances array given a valid directory, and extensions defined, but invalid classToIdx", () => {
    expect(() =>
      makeDataset("test/resources/dataset", { c: 0, d: 1 }, [".jpeg", ".png"])
    ).toThrow(
      new RegExp("ENOENT: no such file or directory, lstat '.*(/|\\\\)c'")
    );
  });

  test("Create valid instances array given a valid directory, and extensions defined, but empty classToIdx", () => {
    const instances = makeDataset("test/resources/dataset", {}, [
      ".jpeg",
      ".png",
    ]);
    expect(instances.length).toEqual(0);
  });
});
