

export default function formatToConfig(cfg) {
  const { items = [] } = cfg;
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
          length: row.items.length,
          value: row.value,
        }))),
      },
      fields: [].concat(...items.map(row => {
        return row.items.map(field => {
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
            value: field.options.base.value.value,
            type: field.type.toLowerCase(),
            props: {
              style: formatToStyle(field.options.style),
              placeholder: formatToPlaceholder(field.options.base),
            },
          };
          if(field.options.items) {
            rst.options = field.options.items;
          }
          return rst;
        })
      }))
    }
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