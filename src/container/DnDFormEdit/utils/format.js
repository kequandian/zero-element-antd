

export default function formatToConfig(cfg) {
  const { items = [] } = cfg;
  const config = {
    layout: 'Empty',
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
          }
        })
      }))
    }
  });
  // items.forEach(item => {
  //   config.items.push({
  //     // layout: item.type,
  //     layout: 'Empty',
  //     component: 'BaseForm',
  //     config: {
  //       layout: 'Grid',
  //       layoutConfig: {
  //         value: item.value,
  //       },
  //       fields: item.items.map((field, i) => {
  //         if (!field) {
  //           return {
  //             label: '',
  //             field: `empty_${i}`,
  //             type: 'empty',
  //           }
  //         }
  //         return {
  //           label: field.title,
  //           field: field.options.base.field.value,
  //           type: field.type.toLowerCase(),
  //         }
  //       })
  //     }
  //   });
  // });

  return config;
}