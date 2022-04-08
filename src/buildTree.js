import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import _ from 'lodash';


const compareFiles = (file1, file2) => {
  const union = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  

  const result = union.map((key) => {
    if (!_.has(file1, key)) {
      return {type: 'added', key, value: file2[key] };
    }

    if (!_.has(file2, key)) {
      return {type: 'deleted', key, value: file1[key] };
    }

    const val1 = file1[key];
    const val2 = file2[key];
    if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
      return { type: 'nested', key, children: compareFiles(val1, val2) };
    }
    if (!_.isEqual(val1, val2)) {
      return { type: 'different', key, val1, val2 };
    }
    return { type: 'same', key, val: val1 };

  });
  const result2 = result
  //console.log(result2)
  return result
};

const buildTree = (file1, file2) => { 
  const result = { type: 'root', children: compareFiles(file1, file2) }
  return result
}

export default buildTree;
