import _ from 'lodash';

export const NODE_TYPES = {
  UNCHANGED: 'unchanged',
  ADDED: 'added',
  DELETED: 'deleted',
  MODIFIED: 'modified',
  COMPLEX: 'complex',
};

export const getDiffTree = (firstObject, secondObject) => {
  const firstObjectKeys = Object.keys(firstObject);
  const secondObjectKeys = Object.keys(secondObject);
  const combinedKeys = _.union(firstObjectKeys, secondObjectKeys).sort();

  return combinedKeys.reduce((tree, key) => {
    if (
      _.isPlainObject(firstObject[key]) &&
      _.isPlainObject(secondObject[key])
    ) {
      return [
        ...tree,
        {
          key,
          children: getDiffTree(firstObject[key], secondObject[key]),
          type: NODE_TYPES.COMPLEX,
        },
      ];
    }

    if (!firstObjectKeys.includes(key)) {
      return [
        ...tree,
        { key, value: secondObject[key], type: NODE_TYPES.ADDED },
      ];
    }

    if (!secondObjectKeys.includes(key)) {
      return [
        ...tree,
        { key, beforeValue: firstObject[key], type: NODE_TYPES.DELETED },
      ];
    }

    if (firstObject[key] !== secondObject[key]) {
      return [
        ...tree,
        {
          key,
          beforeValue: firstObject[key],
          value: secondObject[key],
          type: NODE_TYPES.MODIFIED,
        },
      ];
    }

    return [
      ...tree,
      {
        key,
        value: firstObject[key],
        type: NODE_TYPES.UNCHANGED,
      },
    ];
  }, []);
};
