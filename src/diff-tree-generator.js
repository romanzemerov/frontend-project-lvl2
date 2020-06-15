import _ from 'lodash';
import NODE_TYPES from './node-types.js';

const nodeMappers = [
  {
    check: (firstValue, secondValue) =>
      _.isPlainObject(firstValue) && _.isPlainObject(secondValue),
    getNode: (firstValue, secondValue, getDiffTree) => ({
      children: getDiffTree(firstValue, secondValue),
      type: NODE_TYPES.COMPLEX,
    }),
  },
  {
    check: (firstValue, secondValue) =>
      firstValue !== undefined && secondValue === undefined,
    getNode: (firstValue) => ({
      beforeValue: firstValue,
      type: NODE_TYPES.DELETED,
    }),
  },
  {
    check: (firstValue, secondValue) =>
      firstValue === undefined && secondValue !== undefined,
    getNode: (_firstValue, secondValue) => ({
      afterValue: secondValue,
      type: NODE_TYPES.ADDED,
    }),
  },
  {
    check: (firstValue, secondValue) => firstValue !== secondValue,
    getNode: (firstValue, secondValue) => ({
      beforeValue: firstValue,
      afterValue: secondValue,
      type: NODE_TYPES.MODIFIED,
    }),
  },
  {
    check: (firstValue, secondValue) => firstValue === secondValue,
    getNode: (firstValue) => ({
      afterValue: firstValue,
      type: NODE_TYPES.UNMODIFIED,
    }),
  },
];

const getDiffTree = (firstObject, secondObject) => {
  const firstObjectKeys = Object.keys(firstObject);
  const secondObjectKeys = Object.keys(secondObject);
  const combinedKeys = _.union(firstObjectKeys, secondObjectKeys).sort();

  return combinedKeys.map((key) => {
    const firstObjectValue = firstObject[key];
    const secondObjectValue = secondObject[key];

    const { getNode } = nodeMappers.find(({ check }) =>
      check(firstObjectValue, secondObjectValue),
    );

    return {
      key,
      ...getNode(firstObjectValue, secondObjectValue, getDiffTree),
    };
  });
};

export default getDiffTree;
