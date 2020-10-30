import Dataloader from "./utils/data/DataLoader";

const torch = require("torch-js");

/**
 * Class representing a callable PyTorch model
 * @extends Function
 * @param {Dataloader} loader - Dataloader parameter for inference
 */
export default class Model extends Function {
  /**
   * Create a model
   * @constructor
   * @param {*} path - Path to target model
   */
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

  /**
   * Return a string representation of a PyTorch model
   * @returns {string} Representation of a PyTorch model
   */
  eval = () => {
    return this.scriptModule.toString();
  };

  _makePredictions = (loader) => {
    const iterator = loader.getIterator();
    const results = [];
    while (iterator.hasNext()) {
      const batch = iterator.nextData();
      const outputs = [];
      batch.forEach((item) => {
        const { sample } = item;
        const tensor = torch.tensor([sample.tolist()]);
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

  /**
   * Predict labels for a given model
   * @param {Dataloader} loader - Dataloader object representing target values
   * @returns {[Object]} A collection of results for each Dataloader entry
   */
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
