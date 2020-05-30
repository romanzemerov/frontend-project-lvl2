import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import { getDiffTree } from './diff-tree-generator.js';
import getFormatter from './formatters/index.js';

const getObject = (pathName) => {
  const file = fs.readFileSync(pathName, 'utf-8');
  const extension = path.extname(pathName);

  return getParser(extension)(file);
};

const genDiff = (firstPath, secondPath, formatType) => {
  const firstObject = getObject(firstPath);
  const secondObject = getObject(secondPath);

  const diffTree = getDiffTree(firstObject, secondObject);

  return getFormatter(formatType)(diffTree);
};

export default genDiff;
