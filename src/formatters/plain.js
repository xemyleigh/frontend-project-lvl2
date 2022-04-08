import _ from 'lodash';

const stringify = (data) => {
    if (_.isObject(data)) {
      return '[complex value]';
    }
    if (_.isString(data)) {
      return `'${data}'`;
    }
    return String(data);
  };

const plain = (node, name = []) => {
    const fieldKeys = _.compact([...name, node.key]);
    const fieldName = fieldKeys.join('.');
    switch (node.type) {
        case 'root': {
          const output = node.children.flatMap((child) => plain(child, fieldKeys));
          return output.join('\n');
        }
        case 'nested': {
          const output = _.compact(node.children.flatMap((child) => plain(child, fieldKeys)));
          return output.join('\n');
        }
        case 'added':
          return `Property '${fieldName}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${fieldName}' was removed`;
        case 'different': {
          const { key, val1, val2 } = node;
          return `Property '${fieldName}' was updated. From ${stringify(node.val1)} to ${stringify(node.val2)}`;
        }
        default:
          return '';
      }
}

export default plain