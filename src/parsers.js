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

const getParser = (extension) => {
  switch (extension) {
    case '.json':
      return (file) => JSON.parse(file);
    case '.yml':
      return (file) => yaml.safeLoad(file);
    case '.ini':
      return (file) => formatIni(ini.parse(file));
    default:
      throw new Error(`Unknown file extension - '${extension}'`);
  }
};

export default getParser;
