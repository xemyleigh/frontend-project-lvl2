import jsYaml from 'js-yaml';

export default {
  '.json': JSON.parse,
  '.yaml': jsYaml.load,
  '.yml': jsYaml.load,
};
