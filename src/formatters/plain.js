import _ from 'lodash';
import { NODE_TYPES } from '../diff-tree-generator';

const getNodePath = (objectName, currentPath) =>
  currentPath === '' ? `${objectName}` : `${currentPath}.${objectName}`;

const stringify = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (_.isPlainObject(value)) return '[complex value]';
  return value;
};

const getString = ({ key, type, beforeValue, value }, path) => {
  const nodePath = getNodePath(key, path);
  const convertedBeforeValue = beforeValue
    ? stringify(beforeValue)
    : beforeValue;
  const convertedValue = value ? stringify(value) : value;

  switch (type) {
    case 'unchanged':
      return `Property '${nodePath}' unchanged`;
    case 'added':
      return `Property '${nodePath}' was added with value: ${convertedValue}`;
    case 'deleted':
      return `Property '${nodePath}' was deleted`;
    case 'modified':
      return `Property '${nodePath}' was changed from ${convertedBeforeValue} to ${convertedValue}`;
    default:
      throw new Error(`Unknown object status value - '${type}'`);
  }
};

const formatPlain = (tree, path) =>
  tree.reduce((acc, node) => {
    const { key, type, children } = node;

    if (type === NODE_TYPES.COMPLEX) {
      const newPath = getNodePath(key, path);

      return [...acc, formatPlain(children, newPath)];
    }

    return [...acc, getString(node, path)];
  }, []);

export default (tree) => formatPlain(tree, '').flat(Infinity).join('\n');
