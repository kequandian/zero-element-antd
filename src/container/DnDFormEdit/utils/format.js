
const unusualType = {
  OneMany: function (field, config) {
    const { options } = field;

    const { base, advanced, table } = options;
    const { path } = base;

    const oneManyObj = {
      layout: 'Empty',
      component: 'ChildrenList',
      config: {
        itemsField: options.field.value,
        oneMany: {
          tableName: advanced.tableName.value,
          field: advanced.field.value,
        },
        actions: [],
        fields: table.map(f => ({
          label: f.label,
          field: f.value,
        })),
        operation: []
      },
    }

    if (path.value) {
      // 跳转页面型 一对多
      oneManyObj.config.actions.push({
        title: '新增', type: 'path',
        options: {
          path: `${path.value}-add`,
          icon: 'plus',
          query: {
            id: 'id',
          }
        },
      });
      oneManyObj.config.operation.push({
        title: '编辑', action: 'path',
        options: {
          outside: true,
          path: `${path.value}-edit`,
          query: {
            id: 'id',
          }
        },
      });
    } else {
      // 模态框型 一对多
      const addModalFields = [];
      const editModalFields = [];

      table.forEach(f => {
        const { options = {} } = f;
        const { type, echoAdd, echoEdit } = options;

        if (type) {
          if (echoAdd) {
            addModalFields.push({
              label: f.label,
              field: f.value,
              type: type,
            });
          }
          if (echoEdit) {
            editModalFields.push({
              label: f.label,
              field: f.value,
              type: type,
            });
          }
        }
      })

      oneManyObj.config.actions.push({
        title: '添加数据', type: 'children-modal-add', options: {
          modalTitle: '添加数据',
          modalWidth: 580,
          items: [
            {
              layout: 'Empty',
              component: 'ChildrenForm',
              config: {
                fields: addModalFields,
              },
            }
          ],
        }
      });

      oneManyObj.config.operation.push({
        title: '编辑数据', action: 'childEditModal',
        options: {
          outside: true,
          modalTitle: '编辑数据',
          modalWidth: 580,
          layout: 'Content',
          items: [
            {
              layout: 'Empty',
              component: 'ChildrenForm',
              config: {
                fields: editModalFields,
              },
            },
          ],
        }
      });
    }

    config.items.push(oneManyObj);
  },
};

export default function formatToConfig(cfg, formName, opt) {
  const { items = [] } = cfg;
  const { layoutType } = opt;
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
    layout: 'EmptyTitle',
    title: formName || '表单',
    items: [],
  }
  let count = 0;
  config.items.push({
    layout: 'Empty',
    component: 'BaseForm',
    config: {
      layout: 'Grid',
      layoutConfig: {
        layoutType: layoutType, // horizontal vertical
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
          field: field.options.field.value,
          value: formatToValue(field.options.base),
          type: field.type.toLowerCase(),
          props: {
            style: formatToStyle(field.options.style),
            placeholder: formatToPlaceholder(field.options.base),
          },
          rules: formatToRules(field.options.rules),
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

  return [config, pureFields(fields)];
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
function formatToRules(rules) {
  if (!rules || !Object.keys(rules).length) return undefined;
  return Object.values(rules).map(item => {
    return item.value;
  }).filter(i => i)
}

/**
 * 返回有效的字段列表
 *
 * @param {Array} fields
 * @returns
 */
function pureFields(fields) {
  return fields.filter(i => i).map(item => ({
    label: item.options.base.label.value,
    field: item.options.field.value,
  }));
}