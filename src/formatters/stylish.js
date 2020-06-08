import _ from 'lodash';
import NODE_TYPES from '../node-types.js';

const DEFAULT_NESTING_LEVEL = 1;
const INDENT_SYMBOL = '  ';
const INDENT_STEP = 2;

const getIndent = (nestingLevel) => {
  return INDENT_SYMBOL.repeat(nestingLevel);
};

const stringify = (key, value, nestingLevel) => {
  const indent = getIndent(nestingLevel + DEFAULT_NESTING_LEVEL);

  if (_.isPlainObject(value)) {
    const nestingIndent = getIndent(
      nestingLevel + INDENT_STEP + DEFAULT_NESTING_LEVEL,
    );
    const restStrings = Object.entries(value)
      .map(([objKey, objValue]) => `${nestingIndent}${objKey}: ${objValue}`)
      .join('/n');

    return `${key}: {\n${restStrings}\n${indent}}`;
  }

  return `${key}: ${value}`;
};

const formatStylish = (tree, nestingLevel) =>
  tree.reduce((currentTree, { key, type, beforeValue, value, children }) => {
    const indent = getIndent(nestingLevel);

    switch (type) {
      case NODE_TYPES.COMPLEX:
        return [
          ...currentTree,
          `${indent}  ${key}: {`,
          formatStylish(children, nestingLevel + INDENT_STEP),
          `${indent}  }`,
        ];
      case NODE_TYPES.UNCHANGED:
        return [
          ...currentTree,
          `${indent}  ${stringify(key, value, nestingLevel)}`,
        ];
      case NODE_TYPES.ADDED:
        return [
          ...currentTree,
          `${indent}+ ${stringify(key, value, nestingLevel)}`,
        ];
      case NODE_TYPES.DELETED:
        return [
          ...currentTree,
          `${indent}- ${stringify(key, beforeValue, nestingLevel)}`,
        ];
      case NODE_TYPES.MODIFIED:
        return [
          ...currentTree,
          `${indent}- ${stringify(key, beforeValue, nestingLevel)}`,
          `${indent}+ ${stringify(key, value, nestingLevel)}`,
        ];
      default:
        throw new Error(`Unknown object status value - '${type}'`);
    }
  }, []);

export default (tree) =>
  `{\n${formatStylish(tree, DEFAULT_NESTING_LEVEL)
    .flat(Infinity)
    .join('\n')}\n}`;
