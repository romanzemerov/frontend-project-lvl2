import _ from 'lodash';
import NODE_TYPES from '../node-types.js';

const DEFAULT_NESTING_LEVEL = 1;
const INDENT_SYMBOL = '  ';
const INDENT_STEP = 2;

const getIndent = (nestingLevel) => {
  return INDENT_SYMBOL.repeat(nestingLevel);
};

const stringify = (value, nestingLevel) => {
  if (!_.isPlainObject(value)) {
    return value;
  }

  const indent = getIndent(nestingLevel + DEFAULT_NESTING_LEVEL);
  const nestingIndent = getIndent(
    nestingLevel + INDENT_STEP + DEFAULT_NESTING_LEVEL,
  );
  const restStrings = Object.entries(value)
    .map(([objKey, objValue]) => `${nestingIndent}${objKey}: ${objValue}`)
    .join('/n');

  return `{\n${restStrings}\n${indent}}`;
};

const formatStylish = (tree, nestingLevel) => {
  const result = tree.map(({ key, type, beforeValue, value, children }) => {
    const indent = getIndent(nestingLevel);

    switch (type) {
      case NODE_TYPES.COMPLEX:
        return [
          `${indent}  ${key}: {`,
          formatStylish(children, nestingLevel + INDENT_STEP),
          `${indent}  }`,
        ];
      case NODE_TYPES.UNMODIFIED:
        return `${indent}  ${key}: ${stringify(value, nestingLevel)}`;
      case NODE_TYPES.ADDED:
        return `${indent}+ ${key}: ${stringify(value, nestingLevel)}`;
      case NODE_TYPES.DELETED:
        return `${indent}- ${key}: ${stringify(beforeValue, nestingLevel)}`;
      case NODE_TYPES.MODIFIED:
        return [
          `${indent}- ${key}: ${stringify(beforeValue, nestingLevel)}`,
          `${indent}+ ${key}: ${stringify(value, nestingLevel)}`,
        ];
      default:
        throw new Error(`Unknown object status value - '${type}'`);
    }
  });

  return result.flat(Infinity).join('\n');
};

export default (tree) => `{\n${formatStylish(tree, DEFAULT_NESTING_LEVEL)}\n}`;
