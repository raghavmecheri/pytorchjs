const nj = require("numjs");

class InvertAxes extends Function {
  constructor() {
    super();
    return new Proxy(this, {
      apply: (_target, _thisArg, argumentsList) => {
        const x = argumentsList[0];
        const output = this.__call__(x);
        return output;
      },
    });
  }

  __call__ = (x) => x.transpose(2, 0, 1);
}

class Grayscale extends Function {
  constructor() {
    super();
    return new Proxy(this, {
      apply: (_target, _thisArg, argumentsList) => {
        const x = argumentsList[0];
        return this.__call__(x);
      },
    });
  }

  __call__ = (x) => nj.images.rgb2gray(x);
}

class Resize extends Function {
  constructor(dims) {
    super();
    this.dims = dims;
    return new Proxy(this, {
      apply: (_target, _thisArg, argumentsList) => {
        const x = argumentsList[0];
        return this.__call__(x);
      },
    });
  }

  __call__ = (x) => {
    const { height = x.shape[0], width = x.shape[1] } = this.dims;
    return nj.images.resize(x, height, width);
  };
}

class Compose extends Function {
  constructor(transforms) {
    super();
    this.transforms = transforms;
    return new Proxy(this, {
      apply: (_target, _thisArg, argumentsList) => {
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

class DefaultTransform extends Function {
  constructor(transforms) {
    super();
    this.transforms = transforms;
    return new Proxy(this, {
      apply: (_target, _thisArg, argumentsList) => {
        const x = argumentsList[0];
        return this.__call__(x);
      },
    });
  }

  __call__ = (x) => x;
}

export default {
  InvertAxes,
  Resize,
  Grayscale,
  Compose,
  DefaultTransform,
};
