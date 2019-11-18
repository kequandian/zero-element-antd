"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  OneMany: function OneMany(field, config) {
    var options = field.options;
    var base = options.base,
        advanced = options.advanced,
        table = options.table;
    var path = base.path;
    var oneManyObj = {
      layout: 'Content',
      component: 'ChildrenList',
      config: {
        itemsField: options.field.value,
        oneMany: {
          tableName: advanced.tableName.value,
          field: advanced.field.value
        },
        actions: [],
        fields: table.map(function (f) {
          return {
            label: f.label,
            field: f.value
          };
        }),
        operation: []
      }
    };

    if (path.value) {
      // 跳转页面型 一对多
      oneManyObj.config.actions.push({
        title: '新增',
        type: 'path',
        options: {
          path: "".concat(path.value, "-add"),
          icon: 'plus',
          query: {
            id: 'id'
          }
        }
      });
      oneManyObj.config.operation.push({
        title: '编辑',
        action: 'path',
        options: {
          outside: true,
          path: "".concat(path.value, "-edit"),
          query: {
            id: 'id'
          }
        }
      });
    } else {
      // 模态框型 一对多
      var addModalFields = [];
      var editModalFields = [];
      table.forEach(function (f) {
        var _f$options = f.options,
            options = _f$options === void 0 ? {} : _f$options;
        var type = options.type,
            echoAdd = options.echoAdd,
            echoEdit = options.echoEdit,
            opt = options.options;

        if (type) {
          if (echoAdd) {
            addModalFields.push({
              label: f.label,
              field: f.value,
              type: type,
              options: opt
            });
          }

          if (echoEdit) {
            editModalFields.push({
              label: f.label,
              field: f.value,
              type: type,
              options: opt
            });
          }
        }
      });
      oneManyObj.config.actions.push({
        title: '添加数据',
        type: 'children-modal-add',
        options: {
          modalTitle: '添加数据',
          modalWidth: 580,
          items: [{
            layout: 'Empty',
            component: 'ChildrenForm',
            config: {
              fields: addModalFields
            }
          }]
        }
      });
      oneManyObj.config.operation.push({
        title: '编辑数据',
        action: 'childEditModal',
        options: {
          outside: true,
          modalTitle: '编辑数据',
          modalWidth: 580,
          layout: 'Content',
          items: [{
            layout: 'Empty',
            component: 'ChildrenForm',
            config: {
              fields: editModalFields
            }
          }]
        }
      });
    }

    config.items.push(oneManyObj);
  }
};
exports["default"] = _default;