// eslint-disable-next-line import/no-unresolved
const torch = require("torch-js");

class Model extends Function {
  constructor(path) {
    super();
    const closure = (args) => closure._call(...args);
    this.scriptModule = new torch.ScriptModule(path);
    return Object.setPrototypeOf(closure, new.target.prototype);
  }

  eval = () => {
    return this.scriptModule.toString();
  };

  predict = (targets) => {
    return targets;
  };

  _call(targets) {
    const results = this.predict(targets);
    return results;
  }
}

const load = (path) => {
  return new Model(path);
};

export default load;
