

export default function formatToConfig(cfg) {
  const { items = [] } = cfg;
  const config = {
    layout: 'Empty',
    title: '表单',
    items: [],
  }
  items.forEach(item => {
    config.items.push({
      layout: item.type,
      layoutConfig: {
        value: item.value,
      },
      component: 'BaseForm',
      config: {
        fields: item.items.map(field => {
          return {
            label: field.title,
            field: field.options.base.field.value,
            type: field.type,
          }
        })
      }
    });
  });

  return config;
}