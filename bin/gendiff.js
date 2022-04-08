#!/usr/bin/env node

import { Command, Option } from 'commander';
import genDiff from '../src/gendiff.js';

const program = new Command();

program
  .name('gendiff')
  .usage('[options] <filepath1> <filepath2>')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .addOption(new Option('-f, --format [type]', 'output format').choices(['stylish', 'plain', 'json']).default('stylish'))
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format));
  });

program.parse();
