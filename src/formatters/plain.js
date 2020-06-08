import _ from 'lodash';
import NODE_TYPES from '../node-types.js';

const stringify = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }

  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return value;
};

const getString = ({ key, type, beforeValue, value }, path) => {
  const nodePath = `${path}${key}`;
  const convertedBeforeValue = stringify(beforeValue);
  const convertedValue = stringify(value);

  switch (type) {
    case NODE_TYPES.UNCHANGED:
      return `Property '${nodePath}' unchanged`;
    case NODE_TYPES.ADDED:
      return `Property '${nodePath}' was added with value: ${convertedValue}`;
    case NODE_TYPES.DELETED:
      return `Property '${nodePath}' was deleted`;
    case NODE_TYPES.MODIFIED:
      return `Property '${nodePath}' was changed from ${convertedBeforeValue} to ${convertedValue}`;
    default:
      throw new Error(`Unknown object status value - '${type}'`);
  }
};

const formatPlain = (tree, path) =>
  tree.map((node) => {
    const { key, type, children } = node;

    if (type === NODE_TYPES.COMPLEX) {
      return formatPlain(children, `${path}${key}.`);
    }

    return getString(node, path);
  });

export default (tree) => formatPlain(tree, '').flat(Infinity).join('\n');
