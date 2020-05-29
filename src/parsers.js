import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (pathName) => {
  const file = fs.readFileSync(pathName, 'utf-8');
  const extension = path.extname(pathName);

  switch (extension) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.safeLoad(file);
    case '.ini':
      return ini.parse(file);
    default:
      throw new Error(`Unknown file extension - '${extension}'`);
  }
};

export default parse;
