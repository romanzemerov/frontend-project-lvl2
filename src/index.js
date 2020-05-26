import union from 'lodash/union.js';
import parsePath from './parsers';

const genDiff = (firstPath, secondPath) => {
  const firstFile = parsePath(firstPath);
  const secondFile = parsePath(secondPath);

  const firstFileKeys = Object.keys(firstFile);
  const secondFileKeys = Object.keys(secondFile);

  const unionOfTwoObject = union(firstFileKeys, secondFileKeys);
  const result = unionOfTwoObject.map((key) => {
    if (!firstFileKeys.includes(key)) {
      return `  + ${key}: ${secondFile[key]}`;
    }

    if (!secondFileKeys.includes(key)) {
      return `  - ${key}: ${firstFile[key]}`;
    }

    const firstFileValue = firstFile[key];
    const secondFileValue = secondFile[key];

    if (firstFileValue !== secondFileValue) {
      return `  + ${key}: ${secondFile[key]}\n  - ${key}: ${firstFile[key]}`;
    }

    return `    ${key}: ${secondFile[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
