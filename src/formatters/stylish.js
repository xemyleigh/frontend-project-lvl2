import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (data, depth, formatter) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const output = Object.entries(data)
    .map(([key, val]) => stylish({ type: 'same', key, val }, depth + 1));

  return `{\n${output.join('\n')}\n${indent(depth)}  }`;
};

const stylish = (node, depth = 0) => {

  console.log(node.key)


  switch (node.type) {
    case 'root': {
      const output = node.children.flatMap((node) => stylish(node, depth + 1));
      return `{\n${output.join('\n')}\n}`;
    }
    case 'nested': {
      const output = node.children.flatMap((node) => stylish(node, depth + 1));
      return `${indent(depth)}  ${node.key}: {\n${output.join('\n')}\n${indent(depth)}  }`;
    }
    case 'added':
      return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth, stylish)}`;
    case 'deleted':
      return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth, stylish)}`;
    case 'same':
      return `${indent(depth)}  ${node.key}: ${stringify(node.val, depth, stylish)}`;
    case 'different': {
      const { key, val1, val2 } = node;
      const data1 = `${indent(depth)}- ${key}: ${stringify(val1, depth, stylish)}`;
      const data2 = `${indent(depth)}+ ${key}: ${stringify(val2, depth, stylish)}`;
      return `${data1}\n${data2}`;
    }
    default:
      return '';
  }
};

export default stylish;