{
    "targets": [{
        "target_name": "pytorchjs",
        "cflags!": [ "-fno-exceptions" ],
        "cflags_cc!": [ "-fno-exceptions" ],
        "sources": [
            "torchlib/pytorchjs.cpp",
            "torchlib/Samples/functionexample.cpp",
            "torchlib/Samples/actualclass.cpp",
            "torchlib/Samples/classexample.cpp"
        ],
        'include_dirs': [
            "<!@(node -p \"require('node-addon-api').include\")"
        ],
        'libraries': [],
        'dependencies': [
            "<!(node -p \"require('node-addon-api').gyp\")"
        ],
        'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
    }]
}
