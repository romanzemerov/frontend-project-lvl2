#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstFile> <secondFile>')
  .option('-f, --format [type]', 'output format')
  .action((firstPath, secondPath) => {
    console.log(genDiff(firstPath, secondPath));
  })
  .parse(process.argv);
