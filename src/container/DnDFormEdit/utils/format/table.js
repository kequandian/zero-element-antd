

export default function formatToTableConfig(cfg, formName, opt) {
  const { items = [] } = cfg;

  const fields = [].concat(...items.map(row => row.items));
  const config = {
    layout: 'TitleContent',
    title: formName || '表格',
    items: [],
  }

  fields.forEach(field => {
    const { options } = field;
    const { searchItems, tableItems, actions, operation, config: cfg } = options;

    if (Array.isArray(searchItems)) {
      config.items.push({
        component: 'Search',
        config: {
          layout: 'Grid',
          layoutConfig: {
            value: [6, 6, 6, 6],
          },
          fields: searchItems,
        }
      });
    }
    if (Array.isArray(tableItems)) {
      config.items.push({
        component: 'Table',
        config: {
          API: formatToAPI(cfg),
          actions,
          fields: tableItems,
          operation,
        }
      });
    }
  })

  return [config, pureFields(fields)];
}

function formatToAPI(cfg) {
  const { listAPI, deleteAPI } = cfg;

  return {
    listAPI: listAPI.value,
    deleteAPI: deleteAPI.value,
  };
}

/**
 * 返回有效的字段列表
 *
 * @param {Array} fields
 * @returns
 */
function pureFields(fields) {
  return fields.filter(i => i).map(item => ({
    label: item.options.base.label && item.options.base.label.value || '',
    field: item.options.field.value,
  }));
}