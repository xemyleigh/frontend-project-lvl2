import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import _ from 'lodash';
import parsers from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const getParsedData = (path) => {
  const fileExtension = extname(path);
  const getData = readFileSync(resolve(path), 'utf-8');

  return parsers[fileExtension](getData);
};

const genDiff = (path1, path2, style = 'stylish') => {
  const file1 = getParsedData(path1);
  const file2 = getParsedData(path2);

  return format(buildTree(file1, file2), style)

}


export default genDiff;