import parsePath from './parsers.js';
import getDiff from './diff-generator.js';
import format from './formatters.js';

const genDiff = (firstPath, secondPath, formatType) => {
  const firstFile = parsePath(firstPath);
  const secondFile = parsePath(secondPath);

  const diff = getDiff(firstFile, secondFile);

  return format(formatType, diff);
};

export default genDiff;
