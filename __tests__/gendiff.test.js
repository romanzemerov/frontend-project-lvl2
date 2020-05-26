import { test, expect, describe, beforeAll } from '@jest/globals';
import genDiff from '../src/index.js';

let beforeJSONPath;
let afterJSONPath;
let beforeYAMLPath;
let afterYAMLPath;
let beforeIniPath;
let afterIniPath;
let expectingResult;

describe('Generate diffs', () => {
  beforeAll(() => {
    beforeJSONPath = `./__fixtures__/before.json`;
    afterJSONPath = './__fixtures__/after.json';
    beforeYAMLPath = `./__fixtures__/before.yml`;
    afterYAMLPath = './__fixtures__/after.yml';
    beforeIniPath = `./__fixtures__/before.ini`;
    afterIniPath = './__fixtures__/after.ini';

    expectingResult = `{\n${[
      '    host: hexlet.io',
      '  + timeout: 20\n  - timeout: 50',
      '  - proxy: 123.234.53.22',
      '  - follow: false',
      '  + verbose: true',
    ].join('\n')}\n}`;
  });

  test("Generate diff with JSON's files", () => {
    expect(genDiff(beforeJSONPath, afterJSONPath)).toBe(expectingResult);
  });

  test("Generate diff with YAML's files", () => {
    expect(genDiff(beforeYAMLPath, afterYAMLPath)).toBe(expectingResult);
  });

  test("Generate diff with ini's files", () => {
    expect(genDiff(beforeIniPath, afterIniPath)).toBe(expectingResult);
  });
});
