

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
        // value: item.value,
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
          return {
            label: field.title,
            field: field.options.base.field.value,
            type: field.type.toLowerCase(),
            props: {
              style: formatToStyle(field.options.style),
            },
          }
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