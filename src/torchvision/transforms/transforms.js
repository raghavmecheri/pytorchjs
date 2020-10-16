const torch = require("torch-js");
const nj = require("numjs");

class ToTensor extends Function {
  constructor() {
    super();
    return new Proxy(this, {
      apply: async (_target, _thisArg, argumentsList) => {
        const x = argumentsList[0];
        return this.__call__(x);
      },
    });
  }

  __call__ = (x) => torch.toTensor(x);
}

class InvertAxes extends Function {
  constructor() {
    super();
    return new Proxy(this, {
      apply: async (_target, _thisArg, argumentsList) => {
        const x = argumentsList[0];
        return this.__call__(x);
      },
    });
  }

  __call__ = (x) => x.transpose(2, 0, 1);
}

class Grayscale extends Function {
  constructor() {
    super();
    return new Proxy(this, {
      apply: async (_target, _thisArg, argumentsList) => {
        const x = argumentsList[0];
        return this.__call__(x);
      },
    });
  }

  __call__ = (x) => nj.images.rgb2gray(x);
}

class Resize extends Function {
  constructor(dim) {
    super();
    this.dim = dim;
    return new Proxy(this, {
      apply: async (_target, _thisArg, argumentsList) => {
        const x = argumentsList[0];
        return this.__call__(x);
      },
    });
  }

  __call__ = (x) => nj.images.resize(x, ...this.dim);
}

class Compose {
  constructor(transforms) {
    this.transforms = transforms;
    return new Proxy(this, {
      apply: async (_target, _thisArg, argumentsList) => {
        const x = argumentsList[0];
        return this.__call__(x);
      },
    });
  }

  __call__ = (x) => {
    let result = x;
    this.transforms.forEach((transform) => {
      result = transform(result);
    });
    return result;
  };
}

export default {
  InvertAxes,
  Resize,
  Grayscale,
  ToTensor,
  Compose,
};
