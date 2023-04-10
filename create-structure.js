#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const args = process.argv.slice(2);
if (args.length < 1 || args.length > 2) {
  console.error('Usage: node script.js path/to/structure.[json|yml] [path/to/destination/folder]');
  process.exit(1);
}

const structurePath = args[0];
const destinationFolder = args[1] || '.';
const extension = path.extname(structurePath);
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

function createStructure(basePath, structure) {
  for (const key in structure) {
    const item = structure[key];
    const itemPath = path.join(basePath, key);

    if (typeof item === 'object' && item !== null) {
      if (!fs.existsSync(itemPath)) {
        fs.mkdirSync(itemPath, { recursive: true });
      }
      createStructure(itemPath, item);
    } else {
      if (key.startsWith('.')) {
        fs.writeFileSync(itemPath, '');
      } else {
        const extensionPattern = /\.[0-9a-z]+$/i;
        if (extensionPattern.test(key)) {
          if (item !== null) {
            if (extension === '.json') {
              fs.writeFileSync(itemPath, JSON.stringify(item));
            } else {
              fs.writeFileSync(itemPath, yaml.safeDump(item));
            }
          } else {
            fs.writeFileSync(itemPath, '');
          }
        } else {
          const destinationPath = path.join(destinationFolder, itemPath);
          if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
          }
        }
      }
    }
  }
}

try {
  createStructure(destinationFolder, structure);
  console.log('Directory structure created successfully.');
} catch (error) {
  console.error('Error creating directory structure:', error);
  process.exit(1);
}
