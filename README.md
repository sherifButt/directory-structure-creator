# Directory Structure Creator

This script is a Node.js program that creates a directory structure from a JSON or YAML file.

## Installation

To install the dependencies, run:

```
npm install
```

## Usage

To run the script, use the following command:

```
node script.js path/to/structure.[json|yml] [path/to/destination/folder]
```

The script takes two arguments:

- `path/to/structure.[json|yml]` is the path to the JSON or YAML file that contains the directory structure to be created.
- `path/to/destination/folder` is the path to the folder where the directory structure will be created. If this argument is not provided, the directory structure will be created in the current working directory.

The script will create the directory structure recursively based on the JSON or YAML file provided. If a file in the directory structure has a `.json` or `.yml` extension, the file will be filled with the JSON or YAML value pair if the value is not null. If a file in the directory structure has a `.ico`, `.png`, or `.psd` extension, the file will be skipped.

## Examples

To create a directory structure from a `structure.json` file in the current directory and save it to a `my-app` directory in the current directory, run:
```
node script.js structure.json my-app
```


To create a directory structure from a `structure.yml` file in the `~/Documents` directory and save it to a `my-project` directory in the current directory, run:

```
node script.js ~/Documents/structure.yml my-project
```


## License

This project is licensed under the MIT License. See the LICENSE file for details.
