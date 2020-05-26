import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsePath = (pathName) => {
  const extension = path.extname(pathName);

  if (extension === '.json') {
    return JSON.parse(fs.readFileSync(pathName, 'utf-8'));
  }

  if (extension === '.yml') {
    return yaml.safeLoad(fs.readFileSync(pathName, 'utf-8'));
  }
};

export default parsePath;
