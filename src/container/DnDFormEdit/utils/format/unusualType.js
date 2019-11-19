export default {
  OneMany: function (field, config) {
    const { options } = field;

    const { base, advanced, table } = options;
    const { path } = base;

    const oneManyObj = {
      layout: 'Content',
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
        const { type, echoAdd, echoEdit, options: opt } = options;

        if (type) {
          if (echoAdd) {
            addModalFields.push({
              label: f.label,
              field: f.value,
              type: type,
              options: opt,
            });
          }
          if (echoEdit) {
            editModalFields.push({
              label: f.label,
              field: f.value,
              type: type,
              options: opt,
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

      oneManyObj.config.operation.push(
        {
          title: '编辑', action: 'childEditModal',
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
        },
        {
          title: '移除',
          action: 'removeChild',
          options: {
            icon: 'delete',
            color: '#f5222d',
          },
        }
      );
    }

    config.items.push(oneManyObj);
  },
};