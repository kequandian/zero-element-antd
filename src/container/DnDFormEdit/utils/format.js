
const unusualType = {
  OneMany: function (field, config) {
    const { options } = field;
    const { base, advanced, table } = options;
    config.items.push({
      layout: 'Empty',
      component: 'ChildrenList',
      config: {
        itemsField: base.field.value,
        actions: [],
        fields: table.map(f => ({
          label: f.label,
          field: f.value,
        }))
      },
    });
  },
};

export default function formatToConfig(cfg) {
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
    layout: 'Content',
    title: '表单',
    items: [],
  }
  let count = 0;
  config.items.push({
    layout: 'Empty',
    component: 'BaseForm',
    config: {
      layout: 'Grid',
      layoutConfig: {
        layoutArea: [].concat(...items.map(row => ({
          layout: row.type,
          length: row.value.length,
          value: row.value,
        }))),
      },
      fields: filterFields.map(field => {
        if (!field) {
          return {
            label: '',
            field: `empty_${count++}`,
            type: 'empty',
          }
        }
        const rst = {
          label: field.options.base.label.value || '',
          field: field.options.base.field.value,
          value: formatToValue(field.options.base),
          type: field.type.toLowerCase(),
          props: {
            style: formatToStyle(field.options.style),
            placeholder: formatToPlaceholder(field.options.base),
          },
        };
        if (field.options.items) {
          rst.options = field.options.items;
        }
        return rst;
      })
    }
  });

  unusualFields.forEach(cfg => {
    cfg.func(cfg.field, config);
  });

  return config;
}

function formatToStyle(style) {
  if (!style) return undefined;
  const rst = {};
  Object.keys(style).forEach(key => {
    rst[key] = style[key].value;
  });
  return rst;
}
function formatToPlaceholder(base) {
  if (!base.placeholder) return undefined;
  return base.placeholder.value;
}
function formatToValue(base) {
  if (!base.value) return undefined;
  return base.value.value;
}