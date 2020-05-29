import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const format = (name, diff) => {
  switch (name) {
    case 'stylish':
      return formatStylish(diff);
    case 'plain':
      return formatPlain(diff);
    case 'json':
      return formatJSON(diff);
    default:
      throw new Error(`Unknown formatter name - '${name}'`);
  }
};

export default format;
