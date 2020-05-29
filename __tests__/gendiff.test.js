import fs from 'fs';
import { test, expect, describe, beforeAll } from '@jest/globals';
import expectingTree from '../__fixtures__/expectingTree';
import getDiff from '../src/diff-generator.js';
import format from '../src/formatters/index.js';
import genDiff from '../src';

let beforeJSONPath;
let afterJSONPath;
let beforeYAMLPath;
let afterYAMLPath;
let beforeIniPath;
let afterIniPath;

describe('Generate diffs', () => {
  beforeAll(() => {
    beforeJSONPath = `./__fixtures__/before.json`;
    afterJSONPath = './__fixtures__/after.json';
    beforeYAMLPath = `./__fixtures__/before.yml`;
    afterYAMLPath = './__fixtures__/after.yml';
    beforeIniPath = `./__fixtures__/before.ini`;
    afterIniPath = './__fixtures__/after.ini';
  });

  test("Generate AST diff tree with JSON's files", () => {
    expect(
      getDiff(
        JSON.parse(fs.readFileSync(beforeJSONPath, 'utf-8')),
        JSON.parse(fs.readFileSync(afterJSONPath, 'utf-8')),
      ),
    ).toEqual(expectingTree);
  });

  test('Generate pretty string result of diff', () => {
    expect(format('stylish', expectingTree)).toEqual(
      fs.readFileSync('./__fixtures__/result-stylish.txt', 'utf-8'),
    );
  });

  test('Generate plain string result of diff', () => {
    expect(format('plain', expectingTree)).toEqual(
      fs.readFileSync('./__fixtures__/result-plain.txt', 'utf-8'),
    );
  });

  test('Generate JSON result of diff', () => {
    expect(format('json', expectingTree)).toEqual(
      fs.readFileSync('./__fixtures__/result-json.txt', 'utf-8'),
    );
  });

  test("Generate diff with YAML's files", () => {
    expect(genDiff(beforeYAMLPath, afterYAMLPath, 'stylish')).toBe(
      fs.readFileSync('./__fixtures__/result-stylish.txt', 'utf-8'),
    );
  });

  test("Generate diff with ini's files", () => {
    expect(genDiff(beforeIniPath, afterIniPath, 'stylish')).toBe(
      fs.readFileSync('./__fixtures__/result-stylish.txt', 'utf-8'),
    );
  });
});
