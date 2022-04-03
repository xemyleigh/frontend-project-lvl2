import genDiff from "../gendiffRealization";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from "fs";
import { join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gediff', () => {
    const expected = readFileSync(getFixturePath('results'), 'utf-8')

    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))
    expect(result).toEqual(expected);
})