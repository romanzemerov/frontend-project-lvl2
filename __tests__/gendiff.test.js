import fs from 'fs';
import path from 'path';
import { test, expect, describe } from '@jest/globals';
import genDiff from '../src';

const FORMATS_LIST = ['stylish', 'plain', 'json'];
const EXTENSIONS_LIST = ['json', 'yml', 'ini'];

const getFixturesPath = (fixtureName) =>
  path.join(process.cwd(), '__tests__/__fixtures__/', fixtureName);

const getPath = (name, extension) => getFixturesPath(`${name}.${extension}`);

const getExtensionsData = (extensions) =>
  extensions.map((extension) => [
    extension,
    getPath('before', extension),
    getPath('after', extension),
  ]);

const getExpectedResult = (formatter) =>
  getFixturesPath(`result-${formatter}.txt`);

describe('Render diffs', () => {
  describe.each(FORMATS_LIST)('use %s formatter', (formatter) => {
    test.each(getExtensionsData(EXTENSIONS_LIST))(
      'works with %s extension',
      (_, before, after) => {
        expect(genDiff(before, after, formatter)).toEqual(
          fs.readFileSync(getExpectedResult(formatter), 'utf-8'),
        );
      },
    );
  });
});
