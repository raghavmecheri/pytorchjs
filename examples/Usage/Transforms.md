# Using a custom ptjs transform in your workflow

## Background
This example assumes that you have a pre-trained torch model, that has been exported to [torchscript](https://pytorch.org/tutorials/beginner/Intro_to_TorchScript_tutorial.html), as well as an image dataset conforming to the structure that the ptjs DatasetFolder class expects. The structure may also be found below, for reference, and a sample script to export a torch model to torchscript can be found [here](../Exporting/Exporting.md)

## Required File Structure
```
root/class_x/xxx.ext
root/class_x/xxy.ext
root/class_x/xxz.ext

root/class_y/123.ext
root/class_y/nsdf3.ext
root/class_y/asd932_.ext
```

## Use Case
To add a custom transform function to your `transforms.Compose` call

## Sample Script
### Import Dependancies
```js
import { torch, torchvision } from 'pytorchjs';

const { load } = torch;
const { DataLoader } = torch.utils.data;
const { ImageFolder } = torchvision.datasets;
const { Compose, Resize, InvertAxes, Normalize } = torchvision.transforms;
```

### Load Model
```js
const mymodel = load("mymodel.pt");
```

### Declare a custom transform
Custom transform classes must conform to the following requirements. A sample may be found below:
- Be callable. [This](https://hackernoon.com/creating-callable-objects-in-javascript-d21l3te1) is a good starting point, I prefer to just extend the Javascript `Function` interface, like how I've done in [`transforms.js`](https://github.com/raghavmecheri/pytorchjs/blob/master/src/torchvision/transforms/transforms.js)
- Return a `numjs` object
```js
export class RandomAdd extends Function {
  /**
   * Create a new callable RandomAdd object
   */
  constructor() {
    super();
    // NOTE: This is just some template code I found at the linked Hackernoon page to make the function callable :)
    return new Proxy(this, {
      apply: (_target, _thisArg, argumentsList) => {
        const x = argumentsList[0];
        const output = this.__call__(x);
        return output;
      },
    });
  }

  // All I'm doing here is adding a random integer to every value, because why not
  __call__ = (x) => x.add(Math.floor(Math.random() * 10));
}
```

### Implement this custom transform
```js
const transforms = new Compose([
  new Resize({height: 224, width: 224}),
  new RandomAdd(),
  new InvertAxes()
]);
```

### Load data and get inference results
```js
const loader = new DataLoader(new ImageFolder("dataset"), 1, transforms);
const results = await mymodel(loader);
```