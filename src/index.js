import parsePath from './parsers.js';
import getDiff from './diff-generator.js';
import format from './formatters/index.js';

const genDiff = (firstPath, secondPath, formatType) => {
  const firstFile = parsePath(firstPath);
  const secondFile = parsePath(secondPath);

  const diffTree = getDiff(firstFile, secondFile);

  return format(formatType, diffTree);
};

export default genDiff;
