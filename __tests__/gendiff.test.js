import fs from 'fs';
import path from 'path';
import { test, expect, describe } from '@jest/globals';
import genDiff from '../src';

const FORMATS_LIST = ['stylish', 'plain', 'json'];
const EXTENSIONS_LIST = ['json', 'yml', 'ini'];

const getFixturesPath = (fixtureName) =>
  path.join(process.cwd(), '__tests__/__fixtures__/', fixtureName);

const getPath = (name, extension) => getFixturesPath(`${name}.${extension}`);

const getTestsData = (formats, extensions) =>
  extensions.map((extension, index) => {
    const formatter = formats[index];
    const resultFile = `result-${formatter}.txt`;

    return [
      getPath('before', extension),
      getPath('after', extension),
      getFixturesPath(resultFile),
      formatter,
    ];
  });

describe.each(getTestsData(FORMATS_LIST, EXTENSIONS_LIST))(
  'Render diffs',
  (before, after, expected, formatter) => {
    test(`Render diff with ${formatter} formatter`, () => {
      expect(genDiff(before, after, formatter)).toEqual(
        fs.readFileSync(expected, 'utf-8'),
      );
    });
  },
);
