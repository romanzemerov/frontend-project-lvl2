import fs from 'fs';
import { test, expect, describe, beforeAll } from '@jest/globals';
import genDiff from '../src/index.js';

let beforeJSON;
let afterJSON;
let expectingResult;

describe('matching cities to foods', () => {
  beforeAll(() => {
    beforeJSON = JSON.parse(fs.readFileSync(`./__fixtures__/before.json`));
    afterJSON = JSON.parse(fs.readFileSync('./__fixtures__/after.json'));

    expectingResult = `{\n${[
      '    host: hexlet.io',
      '  + timeout: 20\n  - timeout: 50',
      '  - proxy: 123.234.53.22',
      '  - follow: false',
      '  + verbose: true',
    ].join('\n')}\n}`;
  });

  test('gendiff', () => {
    expect(genDiff(beforeJSON, afterJSON)).toBe(expectingResult);
  });
});
