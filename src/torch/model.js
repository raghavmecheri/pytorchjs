import { DataLoader } from "./utils/data";

const torch = require("torch-js");

/**
 * Create a callable pytorchjs model object
 * @extends Function
 */
export class Model extends Function {
  /**
   * Create a new Model object given a path to a pre-trained model
   * @param {*} path - Path to target model
   */
  constructor(path) {
    super();
    /**
     * The child scriptModule used to perform underlying operations
     * @type {torch.scriptModule}
     */
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
   * @param {DataLoader} loader - DataLoader object representing target values
   * @returns {Array} A collection of results for each DataLoader entry
   */
  predict = async (loader) => {
    if (!(loader instanceof DataLoader)) {
      return new Error(
        "You can only call a model object with an instance of the torch.utils.data.DataLoader class!"
      );
    }
    const promisedResults = this._makePredictions(loader);
    const results = await Promise.all(
      promisedResults.map(Promise.all.bind(Promise))
    );
    return this._untensor(results);
  };
}
