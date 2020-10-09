# Exporting your PyTorch model for use with ptjs
ptjs currently only supports models that are in TorchScript, which is an intermediate representation of a PYTorch model that can be run in other high performance environments like C++ and (thanks to this library!) JavaScript.<br>
However, any PyTorch model can be saved as a TorchScript module. An example of the same may be found below.
```python
import torch
import torchvision.models as models

# Setting up a random squeezenet1_0 model
squeezenet = models.squeezenet1_0()

# An example input you would normally provide to your model's forward() method.
example = torch.rand(1, 3, 224, 224)

# Make sure that you call model.eval!
squeezenet.eval()

# Use torch.jit.trace to generate a torch.jit.ScriptModule via tracing.
traced_script_module = torch.jit.trace(squeezenet, example)

# Saving our model to be called in a Javascript environment
traced_script_module.save("squeezenet_ts.pt")
```
