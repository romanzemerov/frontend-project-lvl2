import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const formatIni = (object) =>
  Object.entries(object).reduce((acc, [key, value]) => {
    if (_.isPlainObject(value)) {
      return { ...acc, [key]: formatIni(value) };
    }

    if (!Number.isNaN(parseFloat(value))) {
      return { ...acc, [key]: Number(value) };
    }

    return { ...acc, [key]: value };
  }, {});

const getParser = (type) => {
  switch (type) {
    case 'json':
      return JSON.parse;
    case 'yml':
      return yaml.safeLoad;
    case 'ini':
      return _.flowRight(formatIni, ini.parse);
    default:
      throw new Error(`Unknown type - '${type}'`);
  }
};

export default getParser;
