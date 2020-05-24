#!/usr/bin/env node

import fs from 'fs';
import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstFile> <secondFile>')
  .option('-f, --format [type]', 'output format')
  .action((firstPath, secondPath) => {
    const firstFile = JSON.parse(fs.readFileSync(firstPath));
    const secondFile = JSON.parse(fs.readFileSync(secondPath));

    console.log(genDiff(firstFile, secondFile));
  })
  .parse(process.argv);
