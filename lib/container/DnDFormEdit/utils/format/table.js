import unusualType from "./unusualType";
export default function formatToTableConfig(cfg, formName, opt) {
  const {
    items = []
  } = cfg;
  const {
    layoutType
  } = opt;
  const unusualFields = [];
  const fields = [].concat(...items.map(row => row.items));
  let searchFields = [];
  fields.forEach(field => {
    const {
      options
    } = field;
    const {
      searchItems
    } = options;

    if (Array.isArray(searchItems)) {
      searchFields = searchItems;
    }
  });
  const config = {
    layout: 'TitleContent',
    title: formName || '表格',
    items: []
  };
  config.items.push({
    component: 'Search',
    config: {
      layout: 'Grid',
      layoutConfig: {
        value: [6, 6, 6, 6]
      },
      fields: searchFields
    }
  });
  config.items.push({
    component: 'Table',
    config: {
      API: {},
      fields: []
    }
  });
  unusualFields.forEach(cfg => {
    cfg.func(cfg.field, config);
  });
  return [config, pureFields(fields)];
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
    field: item.options.field.value
  }));
}