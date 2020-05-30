import _ from 'lodash';
import { NODE_TYPES } from '../diff-tree-generator';

const indentSymbol = '  ';
const indentStep = 2;

const stringify = (object, sign, indent) => {
  const objectValue =
    sign === '+' || sign === ' ' ? object.value : object.beforeValue;

  if (_.isPlainObject(objectValue)) {
    const firstString = [`${indent}${sign} ${object.key}: {`];
    const restStrings = Object.entries(objectValue).map(
      ([key, value]) => `${indent}      ${key}: ${value}`,
    );
    const lastString = `${indent}  }`;

    return [firstString, ...restStrings, lastString];
  }

  return `${indent}${sign} ${object.key}: ${objectValue}`;
};

const formatStylish = (tree, indentCount) =>
  tree.reduce((acc, obj) => {
    const indent = indentSymbol.repeat(indentCount);

    switch (obj.type) {
      case NODE_TYPES.COMPLEX:
        return [
          ...acc,
          `${indent}  ${obj.key}: {`,
          formatStylish(obj.children, indentCount + indentStep),
          `${indent}  }`,
        ];
      case NODE_TYPES.UNCHANGED:
        return [...acc, stringify(obj, ' ', indent)];
      case NODE_TYPES.ADDED:
        return [...acc, stringify(obj, '+', indent)];
      case NODE_TYPES.DELETED:
        return [...acc, stringify(obj, '-', indent)];
      case NODE_TYPES.MODIFIED:
        return [
          ...acc,
          stringify(obj, '-', indent),
          stringify(obj, '+', indent),
        ];
      default:
        throw new Error(`Unknown object status value - '${obj.type}'`);
    }
  }, []);

export default (tree) =>
  `{\n${formatStylish(tree, 1).flat(Infinity).join('\n')}\n}`;
