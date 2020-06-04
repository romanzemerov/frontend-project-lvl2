import _ from 'lodash';

export const NODE_TYPES = {
  UNCHANGED: 'unchanged',
  ADDED: 'added',
  DELETED: 'deleted',
  MODIFIED: 'modified',
  COMPLEX: 'complex',
};

const NODE_MAPPERS = [
  {
    checker: (firstValue, secondValue) =>
      _.isPlainObject(firstValue) && _.isPlainObject(secondValue),
    getNode: (firstValue, secondValue, getDiffTree) => ({
      children: getDiffTree(firstValue, secondValue),
      type: NODE_TYPES.COMPLEX,
    }),
  },
  {
    checker: (firstValue, secondValue) =>
      firstValue !== undefined && secondValue === undefined,
    getNode: (firstValue) => ({
      beforeValue: firstValue,
      type: NODE_TYPES.DELETED,
    }),
  },
  {
    checker: (firstValue, secondValue) =>
      firstValue === undefined && secondValue !== undefined,
    getNode: (_firstValue, secondValue) => ({
      value: secondValue,
      type: NODE_TYPES.ADDED,
    }),
  },
  {
    checker: (firstValue, secondValue) => firstValue !== secondValue,
    getNode: (firstValue, secondValue) => ({
      beforeValue: firstValue,
      value: secondValue,
      type: NODE_TYPES.MODIFIED,
    }),
  },
  {
    checker: (firstValue, secondValue) => firstValue === secondValue,
    getNode: (firstValue) => ({
      value: firstValue,
      type: NODE_TYPES.UNCHANGED,
    }),
  },
];

export const getDiffTree = (firstObject, secondObject) => {
  const firstObjectKeys = Object.keys(firstObject);
  const secondObjectKeys = Object.keys(secondObject);
  const combinedKeys = _.union(firstObjectKeys, secondObjectKeys).sort();

  return combinedKeys.map((key) => {
    const firstObjectValue = firstObject[key];
    const secondObjectValue = secondObject[key];

    const { getNode } = NODE_MAPPERS.find(({ checker }) =>
      checker(firstObjectValue, secondObjectValue),
    );

    return {
      key,
      ...getNode(firstObjectValue, secondObjectValue, getDiffTree),
    };
  });
};
