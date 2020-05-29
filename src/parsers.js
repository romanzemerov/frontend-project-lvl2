import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const fixIniParse = (obj) => {
  const keys = Object.keys(obj);

  return keys.reduce((acc, key) => {
    if (_.isPlainObject(obj[key])) {
      return { ...acc, [key]: fixIniParse(obj[key]) };
    }

    if (!Number.isNaN(parseFloat(obj[key]))) {
      return { ...acc, [key]: Number(obj[key]) };
    }

    return { ...acc, [key]: obj[key] };
  }, {});
};

const parse = (pathName) => {
  const file = fs.readFileSync(pathName, 'utf-8');
  const extension = path.extname(pathName);

  switch (extension) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.safeLoad(file);
    case '.ini':
      return fixIniParse(ini.parse(file));
    default:
      throw new Error(`Unknown file extension - '${extension}'`);
  }
};

export default parse;
