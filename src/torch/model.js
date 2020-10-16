import Dataloader from "./utils/data/DataLoader";

const torch = require("torch-js");

export default class Model extends Function {
  constructor(path) {
    super();
    this.scriptModule = new torch.ScriptModule(path);
    return new Proxy(this, {
      apply: async (_target, _thisArg, argumentsList) => {
        const loader = argumentsList[0];
        const result = await this.predict(loader);
        return result;
      },
    });
  }

  eval = () => {
    return this.scriptModule.toString();
  };

  _makePredictions = (loader) => {
    const { transform } = loader;
    const iterator = loader.getIterator();
    const results = [];
    while (iterator.hasNext()) {
      const batch = iterator.nextData();
      const outputs = [];
      batch.forEach((item) => {
        const { sample } = item;
        const tensor = torch.tensor([transform(sample).tolist()]);
        outputs.push(this.scriptModule.forward(tensor));
      });
      results.push(outputs);
    }
    return results;
  };

  _untensor = (tensoredResults) => {
    const untensored = [];
    tensoredResults.forEach((batchResult) => {
      untensored.push(batchResult.map((result) => result.toObject().data));
    });
    return untensored;
  };

  predict = async (loader) => {
    if (!(loader instanceof Dataloader))
      throw new Error(
        "You can only call a model object with an instance of the torch.utils.data.DataLoader class!"
      );
    const promisedResults = this._makePredictions(loader);
    const results = await Promise.all(
      promisedResults.map(Promise.all.bind(Promise))
    );
    return this._untensor(results);
  };
}
