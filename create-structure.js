#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Main function that creates the directory structure based on the JSON or YAML file provided.
 *
 * @param {string} basePath - The path to the folder where the directory structure will be created.
 * @param {Object} structure - The directory structure to be created.
 */
function createStructure(basePath, structure) {
  for (const key in structure) {
    const item = structure[key];
    const itemPath = path.join(basePath, key);

    if (typeof item === 'object' && item !== null) {
      // If the item is an object (i.e., a folder), create the folder and call the function recursively.
      if (!fs.existsSync(itemPath)) {
        fs.mkdirSync(itemPath, { recursive: true });
      }
      createStructure(itemPath, item);
    } else {
      // If the item is a file, create the file or folder as necessary.
      if (key.startsWith('.')) {
        // If the file name starts with a dot, create an empty file.
        fs.writeFileSync(itemPath, '');
      } else {
        const extensionPattern = /\.[0-9a-z]+$/i;
        if (extensionPattern.test(key)) {
          // If the file has a valid extension, write the JSON or YAML value pair to the file if the value is not null.
          if (item !== null) {
            if (extension === '.json') {
              fs.writeFileSync(itemPath, JSON.stringify(item));
            } else {
              fs.writeFileSync(itemPath, yaml.safeDump(item));
            }
          } else {
            // If the value is null, create an empty file.
            fs.writeFileSync(itemPath, '');
          }
        } else {
          // If the file name does not have a valid extension, create a folder.
          const destinationPath = path.join(destinationFolder, itemPath);
          if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
          }
        }
      }
    }
  }
}

// Parse command-line arguments.
const args = process.argv.slice(2);
if (args.length < 1 || args.length > 2) {
  console.error('Usage: node script.js path/to/structure.[json|yml] [path/to/destination/folder]');
  process.exit(1);
}

const structurePath = args[0];
const destinationFolder = args[1] || '.';
const extension = path.extname(structurePath);

// Read the JSON or YAML file and parse it.
const structureString = fs.readFileSync(structurePath, 'utf-8');
let structure;
if (extension === '.json') {
  structure = JSON.parse(structureString);
} else if (extension === '.yml' || extension === '.yaml') {
  structure = yaml.safeLoad(structureString);
} else {
  console.error('Unsupported structure file format. Please use a .json or .yml file.');
  process.exit(1);
}

try {
  createStructure(destinationFolder, structure);
  console.log('Directory structure created successfully.');
} catch (error) {
  console.error('Error creating directory structure:', error);
  process.exit(1);
}
