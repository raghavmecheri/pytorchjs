import Model from "./model";

/**
 * Given a model path, load a model from the torch class
 * @param {*} path - Path to .pt model
 * @returns {Model} - A loaded ptjs model
 */
const load = (path) => {
  return new Model(path);
};

export default load;
