const nj = require("numjs");

/**
 * Invert channels, equivalent to np.transpose(2,0,1)
 * @extends Function
 */
export class InvertAxes extends Function {
  /**
   * Create a new callable InvertAxes object
   */
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
 * Given a datapoint, normalise it to a value (first) between 0 and 1, and then Z-Score it based on the given mean and stdev values
 * @extends Function
 */
export class Normalize extends Function {
  /**
   * Create a new callable Normalize object
   * @param {Array<number>} mean A set of means across dimensions
   * @param {Array<number>} std A set of standard deviation values across dimensions
   */
  constructor(mean, std) {
    super();
    this.mean = mean;
    this.std = std;
    this.PIXELS = 255;
    return new Proxy(this, {
      apply: (_target, _thisArg, argumentsList) => {
        const x = argumentsList[0];
        return this.__call__(x);
      },
    });
  }

  _norm = (arr, mean, std) => {
    const tmp = arr.tolist();
    for (let i = 0; i < arr.shape[0]; i += 1) {
      for (let j = 0; j < arr.shape[1]; j += 1) {
        for (let k = 0; k < 3; k += 1) {
          const target = tmp[i][j][k];
          const norm = (target - mean[k]) / std[k];
          tmp[i][j][k] = norm;
        }
      }
    }
    return nj.array(tmp, "float64");
  };

  __call__ = (x) => this._norm(x.divide(this.PIXELS), this.mean, this.std);
}

/**
 * Convert an image to Greyscale
 * @extends Function
 */
export class Grayscale extends Function {
  /**
   * Create a new callable Greyscale object
   */
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
export class Resize extends Function {
  /**
   * Create a new callable Resize object
   * @param {{ height: number, width: number }} dims Optional height and width dimensions to resize to
   */
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
export class Compose extends Function {
  /**
   * Create a callable Composed transform
   * @param {*} transforms An array of callable Transform instances to compose
   */
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
export class DefaultTransform extends Function {
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
