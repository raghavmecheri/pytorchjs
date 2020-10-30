/**
 * A collection of Transforms which can be used to manipulate data on load
 * @exports InvertAxes - Invert channels, equivalent to np.transpose(2,0,1)
 * @exports Grayscale - Convert an image to Greyscale
 * @exports Resize - Resize an image to provided dimensions
 * @exports Compose - Compose a sequence of ptjs transforms
 * @exports DefaultTransform - Default transform
 */
const nj = require("numjs");

/**
 * Invert channels, equivalent to np.transpose(2,0,1)
 * @extends Function
 */
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

/**
 * Convert an image to Greyscale
 * @extends Function
 */
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

/**
 * Resize an image to provided dimensions
 * @extends Function
 */
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

/**
 * Compose a sequence of ptjs transforms
 * @extends Function
 */
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

/**
 * Default transform, just a pass through function
 * @extends Function
 */
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
