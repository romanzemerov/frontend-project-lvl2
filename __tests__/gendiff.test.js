import fs from 'fs';
import path from 'path';
import { test, expect, describe } from '@jest/globals';
import genDiff from '../src';

const getFixturesPath = (fixtureName) =>
  path.join(process.cwd(), '__fixtures__/', fixtureName);

const formats = ['stylish', 'plain', 'json'];
const extensions = ['json', 'yml', 'ini'];

const testMatrix = formats.map((diffFormat, i) => {
  const extension = extensions[i];
  const beforeFileName = `before.${extension}`;
  const afterFileName = `after.${extension}`;
  const beforePath = `${getFixturesPath(beforeFileName)}`;
  const afterPath = `${getFixturesPath(afterFileName)}`;
  const resultFile = `result-${diffFormat}.txt`;
  const expectingResult = `${getFixturesPath(resultFile)}`;

  return [beforePath, afterPath, diffFormat, expectingResult, extension];
});

describe.each(testMatrix)(
  'Generate diffs',
  (before, after, diffFormat, expected, extension) => {
    test(`Generate ${diffFormat} diff with ${extension} files`, () => {
      expect(genDiff(before, after, diffFormat)).toEqual(
        fs.readFileSync(expected, 'utf-8'),
      );
    });
  },
);
