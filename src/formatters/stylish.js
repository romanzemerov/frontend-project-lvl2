import _ from 'lodash';

const stringify = (object, sign, indent) => {
  const objectValue =
    sign === '+' || sign === ' ' ? object.value : object.beforeValue;

  if (_.isPlainObject(objectValue)) {
    const firstString = [`${indent}${sign} ${object.name}: {`];
    const restStrings = Object.entries(objectValue).map(
      ([key, value]) => `${indent}      ${key}: ${value}`,
    );
    const lastString = `${indent}  }`;

    return [firstString, ...restStrings, lastString];
  }

  return `${indent}${sign} ${object.name}: ${objectValue}`;
};

const formatStylish = (tree) => {
  const indentSymbol = '  ';
  const indentStep = 2;

  const iter = (currentTree, indentCount) => {
    return currentTree.reduce((acc, obj) => {
      const indent = indentSymbol.repeat(indentCount);

      if (Array.isArray(obj.value)) {
        return [
          ...acc,
          `${indent}  ${obj.name}: {`,
          iter(obj.value, indentCount + indentStep),
          `${indent}  }`,
        ];
      }

      switch (obj.status) {
        case 'unchanged': {
          return [...acc, stringify(obj, ' ', indent)];
        }
        case 'added': {
          return [...acc, stringify(obj, '+', indent)];
        }
        case 'deleted': {
          return [...acc, stringify(obj, '-', indent)];
        }
        case 'modified': {
          return [
            ...acc,
            stringify(obj, '-', indent),
            stringify(obj, '+', indent),
          ];
        }
        default: {
          throw new Error(`Unknown object status value - '${obj.status}'`);
        }
      }
    }, []);
  };

  let result = iter(tree, 1);
  result = ['{', ...result, '}'];

  return result.flat(Infinity).join('\n');
};

export default formatStylish;
