import { describe, expect, test } from "@jest/globals";

import { utils } from "../../src/torch";
import { datasets } from "../../src/torchvision";

const { DataLoader } = utils.data;
const { ImageFolder } = datasets;

describe("DataLoader expected functionality", () => {
  const dataset = new ImageFolder("./test/resources/dataset");

  test("Load data via DataLoader iterator given batchSize=1", () => {
    const loader = new DataLoader(dataset);
    const dataIterator = loader.getIterator();
    let items = 0;
    while (dataIterator.hasNext()) {
      const next = dataIterator.nextData();
      expect(next.length).toEqual(1);
      expect(next).not.toEqual(null);
      items += 1;
    }
    expect(items).toEqual(6);
  });

  test("Load data via DataLoader iterator given batchSize=2", () => {
    const loader = new DataLoader(dataset, 2);
    const dataIterator = loader.getIterator();
    let items = 0;
    while (dataIterator.hasNext()) {
      const next = dataIterator.nextData();
      expect(next.length).toEqual(2);
      expect(next).not.toEqual(null);
      items += 2;
    }
    expect(items).toEqual(6);
  });

  test("Load data via DataLoader iterator given batchSize=3", () => {
    const loader = new DataLoader(dataset, 3);
    const dataIterator = loader.getIterator();
    let items = 0;
    while (dataIterator.hasNext()) {
      const next = dataIterator.nextData();
      expect(next.length).toEqual(3);
      expect(next).not.toEqual(null);
      items += 3;
    }
    expect(items).toEqual(6);
  });
});
