import { readFileSync } from 'fs';
import { resolve } from 'path';
import _ from 'lodash';

const genDiff = (path1, path2) => {
  let result = '';
  const file1 = JSON.parse(readFileSync(resolve(path1), 'utf-8'));
  const file2 = JSON.parse(readFileSync(resolve(path2), 'utf-8'));

  const union = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  union.forEach((i) => {
    if (!_.has(file1, i) && _.has(file2, i)) {
      result += `\n   + ${i}: ${file2[i]}`;
    }

    if (!_.has(file2, i) && _.has(file1, i)) {
      result += `\n   - ${i}: ${file1[i]}`;
    }

    if (_.has(file1, i) && _.has(file2, i) && file1[i] !== file2[i]) {
      result += `\n   - ${i}: ${file1[i]}`;
      result += `\n   + ${i}: ${file2[i]}`;
    }

    if (_.has(file1, i) && _.has(file2, i) && file1[i] === file2[i]) {
      result += `\n     ${i}: ${file1[i]}`;
    }
  });
  console.log(`{${result}\n}`);
  return result;
};

export default genDiff;
