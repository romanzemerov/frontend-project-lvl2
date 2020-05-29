import _ from 'lodash';

const getObjectPath = (objectName, currentPath) => {
  return currentPath === '' ? `${objectName}` : `${currentPath}.${objectName}`;
};

const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return value;
};

const getString = (obj, path) => {
  const objectPath = getObjectPath(obj.name, path);

  switch (obj.status) {
    case 'unchanged': {
      return `Property '${objectPath}' unchanged`;
    }
    case 'added': {
      const objectValue = stringify(obj.value);
      return `Property '${objectPath}' was added with value: ${objectValue}`;
    }
    case 'deleted': {
      return `Property '${objectPath}' was deleted`;
    }
    case 'modified': {
      const objectValue = stringify(obj.value);
      const objectBeforeValue = stringify(obj.beforeValue);
      return `Property '${objectPath}' was changed from ${objectBeforeValue} to ${objectValue}`;
    }
    default: {
      throw new Error(`Unknown object status value - '${obj.status}'`);
    }
  }
};

const formatPlain = (tree) => {
  const iter = (currentTree, path) => {
    return currentTree.reduce((acc, obj) => {
      if (Array.isArray(obj.value)) {
        const newPath = getObjectPath(obj.name, path);

        return [...acc, iter(obj.value, newPath)];
      }

      return [...acc, getString(obj, path)];
    }, []);
  };

  const result = iter(tree, '');
  return result.flat(Infinity).join('\n');
};

export default formatPlain;
