# The pytorchjs DataLoader class

## Background
The DataLoader class allows you to lazy-load data just as you need to pass it to your model for inference. It lets you customise a couple of things:
- The ImageFolder class that you're passing in
- Your batch size
- The transforms that you would like to apply on every image you load