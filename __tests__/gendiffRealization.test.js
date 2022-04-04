import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/gendiffRealization.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('gediff json test', () => {
  const expected = readFileSync(getFixturePath('results'), 'utf-8');

  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toEqual(expected);
});

test('gediff yaml test', () => {
  const expected = readFileSync(getFixturePath('results'), 'utf-8');

  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(result).toEqual(expected);
});
