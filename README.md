# AsyncApi Generator CSharp

This repository contains the source to template for [AsyncApi Generator](https://www.asyncapi.com/generator) to generate both a C# client and server. 

> 🚧 Construction Notice 🚧 This project is very much a work in progress and don't expect to use it in production. 

# Setup  

To get your workspace setup for development use the `setup.bat` at the root of the project. This will create the required symlinks needed to generate the server

## Running 

You can us the generator by running the following command 
```cmd
ag.cmd {templatePath} --output {outputDirectory}
```
Additional Arguments:
 * `--force-write`: Write to a directory even if it already has files 
 * `--namespace`: The namespace to use for the generated classes. Defaults to 'AsyncApi`
 * `--outputKind`: You can choose 'Server' or 'Client'
