import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const format = (name, diff) => {
  switch (name) {
    case 'stylish':
      return formatStylish(diff);
    case 'plain':
      return formatPlain(diff);
    default:
      throw new Error(`Incorrect formatter name - ${name}`);
  }
};

export default format;
