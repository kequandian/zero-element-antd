
export default function formatToConfig(cfg, formName) {
  const { items = [] } = cfg;

  const fields = [].concat(...items.map(row => row.items));

  const filterFields = fields.filter(field => field);

  const config = {
    flows: [],
    page: 'A4',
    definitions: {},
    // name: formName || '打印模板',
  }

  filterFields.forEach(field => {
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
    columnsLayout: [],
    columnKeyBindings: [],
    rowHeight: 50,
    headerHeight: 40,
  };

  table.forEach(f => {
    const { label, value } = f;
    config.columnKeyBindings.push({
      key: value,
      column: value,
    });
  });

  return config;
}