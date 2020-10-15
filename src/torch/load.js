import Model from "./model"

const load = (path) => {
    return new Model(path);
};
  
export default load;