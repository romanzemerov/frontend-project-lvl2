import parse from './parsers.js';
import getDiff from './diff-generator.js';
import format from './formatters/index.js';

const genDiff = (firstPath, secondPath, formatType) => {
  const firstFile = parse(firstPath);
  const secondFile = parse(secondPath);

  const diffTree = getDiff(firstFile, secondFile);

  return format(formatType, diffTree);
};

export default genDiff;
