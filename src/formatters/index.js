import stylish from './stylish.js';
import styleField from './plain.js';
import json from './json.js';

const format = (tree, style) => {
  switch (style) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return styleField(tree);
    case 'json':
      return json(tree);
    default:
      return '';
  }
};

export default format;
