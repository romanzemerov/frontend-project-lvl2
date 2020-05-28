import _ from 'lodash';

const getDiff = (firstObject, secondObject) => {
  const firstObjectKeys = Object.keys(firstObject);
  const secondObjectKeys = Object.keys(secondObject);
  const unionKeys = _.union(firstObjectKeys, secondObjectKeys).sort();

  return unionKeys.reduce((acc, key) => {
    if (
      _.isPlainObject(firstObject[key]) &&
      _.isPlainObject(secondObject[key])
    ) {
      return [
        ...acc,
        {
          name: key,
          value: getDiff(firstObject[key], secondObject[key]),
        },
      ];
    }

    if (!firstObjectKeys.includes(key)) {
      return [...acc, { name: key, value: secondObject[key], status: 'added' }];
    }

    if (!secondObjectKeys.includes(key)) {
      return [
        ...acc,
        { name: key, beforeValue: firstObject[key], status: 'deleted' },
      ];
    }

    if (firstObject[key] !== secondObject[key]) {
      return [
        ...acc,
        {
          name: key,
          beforeValue: firstObject[key],
          value: secondObject[key],
          status: 'modified',
        },
      ];
    }

    return [
      ...acc,
      {
        name: key,
        value: firstObject[key],
        status: 'unchanged',
      },
    ];
  }, []);
};

export default getDiff;
