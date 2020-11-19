# The pytorchjs ImageFolder class

## Background
The ImageFolder class is an encapsulation of an image (vision) dataset. It lets you do a couple of cool things, including:
- Specify a custom `loader` function to load the image paths passed in. The default for this is a function that loads the image using `numjs`, which is what all our transforms expect :)
- A transform object to be applied per image. This may be overriden if you pass this object into a DataLoader with it's own transform
- `extensions`, a list of acceptable file extensions to load data from. The default array considered is: `[".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff"]`
- An `isValidFile` method to check if a file at a given path should be loaded or not.

## Selective Loading
Both `extensions` and the `isValidFile` function may be used to selectively load images from your dataset. Only one of these two parameters may be non-null. A sample isValidFile method that only selects .png images has been specified below.
```js
const customIsValidFile = (targetPath) => targetPath.endsWith(".png")
```