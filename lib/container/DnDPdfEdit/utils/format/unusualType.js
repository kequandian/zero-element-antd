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
        table = options.table; // const { path } = base;

    var oneManyObj = {
      layout: 'Content',
      component: 'BaseList',
      config: {
        // itemsField: options.field.value,
        API: {
          listAPI: options.config.API.value,
          deleteAPI: "".concat(options.config.API.value, "/(id)")
        },
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
      } // CRUD 型 一对多

    };
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
      type: 'modal',
      options: {
        modalTitle: '添加数据',
        modalWidth: 880,
        items: [{
          layout: 'Empty',
          component: 'BaseForm',
          config: {
            API: {
              createAPI: options.config.API.value
            },
            layout: 'Grid',
            layoutConfig: {
              value: [12, 12]
            },
            fields: addModalFields
          }
        }]
      }
    });
    oneManyObj.config.operation.push({
      title: '编辑',
      action: 'modal',
      options: {
        outside: true,
        modalTitle: '编辑数据',
        modalWidth: 880,
        layout: 'Content',
        items: [{
          layout: 'Empty',
          component: 'BaseForm',
          config: {
            API: {
              getAPI: "".concat(options.config.API.value, "/(id)"),
              updateAPI: "".concat(options.config.API.value, "/(id)")
            },
            layout: 'Grid',
            layoutConfig: {
              value: [12, 12]
            },
            fields: editModalFields
          }
        }]
      }
    }, {
      title: '删除',
      action: 'delete',
      options: {
        icon: 'delete',
        color: '#f5222d'
      }
    });
    config.items.push(oneManyObj);
  }
};
exports["default"] = _default;