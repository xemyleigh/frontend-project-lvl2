import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import _ from 'lodash';
import parsers from './parsers.js';

const getParsedData = (path) => {
  const fileExtension = extname(path);
  const getData = readFileSync(resolve(path), 'utf-8');

  return parsers[fileExtension](getData);
};

const genDiff = (path1, path2) => {
  const file1 = getParsedData(path1);
  const file2 = getParsedData(path2);

  console.log(file1);
  let result = '';

  const union = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  union.forEach((i) => {
    if (!_.has(file1, i) && _.has(file2, i)) {
      result += `\n  + ${i}: ${file2[i]}`;
    }

    if (!_.has(file2, i) && _.has(file1, i)) {
      result += `\n  - ${i}: ${file1[i]}`;
    }

    if (_.has(file1, i) && _.has(file2, i) && file1[i] !== file2[i]) {
      result += `\n  - ${i}: ${file1[i]}`;
      result += `\n  + ${i}: ${file2[i]}`;
    }

    if (_.has(file1, i) && _.has(file2, i) && file1[i] === file2[i]) {
      result += `\n    ${i}: ${file1[i]}`;
    }
  });
  console.log(`{${result}\n}`);
  return `{${result}\n}`;
};

export default genDiff;
