import _ from 'lodash';

const normalize = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (_.isPlainObject(value)) {
    return '[comlex value]';
  }

  return value;
};

const getPlainText = (obj, path) => {
  const pathToObject = path === '' ? `${obj.name}` : `${path}.${obj.name}`;

  switch (obj.status) {
    case 'unchanged': {
      return `Property '${pathToObject}' unchanged`;
    }
    case 'added': {
      const objectValue = normalize(obj.value);
      return `Property '${pathToObject}' was added with value: ${objectValue}`;
    }
    case 'deleted': {
      return `Property '${pathToObject}' was deleted`;
    }
    case 'modified': {
      const objectValue = normalize(obj.value);
      const objectBeforeValue = normalize(obj.beforeValue);
      return `Property '${pathToObject}' was changed from ${objectBeforeValue} to ${objectValue}`;
    }
    default: {
      throw new Error(`Incorrect obj[status] value - ${obj.status}`);
    }
  }
};

const formatPlain = (tree) => {
  const iter = (currentTree, path) => {
    return currentTree.reduce((acc, obj) => {
      if (Array.isArray(obj.value)) {
        const newPath = path === '' ? `${obj.name}` : `${path}.${obj.name}`;
        return [...acc, iter(obj.value, newPath)];
      }

      return [...acc, getPlainText(obj, path)];
    }, []);
  };

  const result = iter(tree, '');
  return result.flat(Infinity).join('\n');
};

export default formatPlain;
