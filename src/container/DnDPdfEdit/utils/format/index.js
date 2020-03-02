
import unusualType from './unusualType';

export default function formatToConfig(cfg, formName) {
  const { items = [] } = cfg;
  const unusualFields = [];

  const fields = [].concat(...items.map(row => row.items));

  const filterFields = fields.filter(field => {
    if (field && unusualType[field.type]) {
      unusualFields.push({
        field,
        func: unusualType[field.type],
      });
      return false;
    }
    return true;
  });

  const config = {
    flows: [],
    page: {},
    definitions: {},
    name: formName || '打印模板',
  }

  fields.forEach(field => {
    const { type, options } = field;
    config.flows.push(
      formatType(type, options)
    );
  })

  return [config, fields];
}

function formatType(type, options) {
  const map = {
    Table: fTable
  };
  return (map[type] || fUndefined)(options);
}

function fUndefined() {
  return {};
}
function fTable(options) {
  const { table = [] } = options;
  const config = {
    element: {
      header: [],
    },
    convert: {
      headerFields: [],
    },
  };

  table.forEach(f => {
    const { label, value } = f;
    config.element.header.push(label);
    config.convert.headerFields.push(value);
  });

  return config;
}