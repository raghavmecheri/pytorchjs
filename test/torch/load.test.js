import { describe, expect, test } from "@jest/globals";
import { torch } from "../../src/index";

const { load } = torch;

describe("Torch load function tests", () => {
  test("Load model from valid path with no exception", () => {
    load("./test/resources/squeezenet_ts.pt");
    expect(true).toEqual(true);
  });

  test("Load model from invalid path with exception", () => {
    const t = () => load("./test/resources/nonet_ts.pt");
    expect(t).toThrow(new RegExp(/[\s\S]/));
  });
});
