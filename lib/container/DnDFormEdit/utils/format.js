"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatToConfig;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var unusualType = {
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
            echoEdit = options.echoEdit;

        if (type) {
          if (echoAdd) {
            addModalFields.push({
              label: f.label,
              field: f.value,
              type: type
            });
          }

          if (echoEdit) {
            editModalFields.push({
              label: f.label,
              field: f.value,
              type: type
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

function formatToConfig(cfg, formName, opt) {
  var _ref, _ref2;

  var _cfg$items = cfg.items,
      items = _cfg$items === void 0 ? [] : _cfg$items;
  var layoutType = opt.layoutType;
  var unusualFields = [];

  var fields = (_ref = []).concat.apply(_ref, (0, _toConsumableArray2["default"])(items.map(function (row) {
    return row.items;
  })));

  var filterFields = fields.filter(function (field) {
    if (field && unusualType[field.type]) {
      unusualFields.push({
        field: field,
        func: unusualType[field.type]
      });
      return false;
    }

    return true;
  });
  var config = {
    layout: 'EmptyTitle',
    title: formName || '表单',
    items: []
  };
  var count = 0;
  config.items.push({
    layout: 'Content',
    component: 'BaseForm',
    config: {
      layout: 'Grid',
      layoutConfig: {
        layoutType: layoutType,
        // horizontal vertical
        layoutArea: (_ref2 = []).concat.apply(_ref2, (0, _toConsumableArray2["default"])(items.map(function (row) {
          return {
            layout: row.type,
            length: row.value.length,
            value: row.value
          };
        })))
      },
      fields: filterFields.map(function (field) {
        if (!field) {
          return {
            label: '',
            field: "empty_".concat(count++),
            type: 'empty'
          };
        }

        var rst = {
          label: field.options.base.label.value || '',
          field: field.options.field.value,
          value: formatToValue(field.options.base),
          type: formatToType(field.type),
          props: {
            style: formatToStyle(field.options.style),
            placeholder: formatToPlaceholder(field.options.base)
          },
          rules: formatToRules(field.options.rules),
          options: formatToOptions(field.options.config)
        };

        if (field.options.items) {
          rst.options = field.options.items;
        }

        return rst;
      })
    }
  });
  unusualFields.forEach(function (cfg) {
    cfg.func(cfg.field, config);
  });
  return [config, pureFields(fields)];
}

function formatToType(type) {
  return type.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase();
}

function formatToStyle(style) {
  if (!style) return undefined;
  var rst = {};
  Object.keys(style).forEach(function (key) {
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
  return Object.values(rules).map(function (item) {
    return item.value;
  }).filter(function (i) {
    return i;
  });
}

function formatToOptions(options) {
  if (!options || !Object.keys(options).length) return undefined;
  var rst = {};
  Object.keys(options).map(function (key) {
    rst[key] = options[key].value;
  });
  return rst;
}
/**
 * 返回有效的字段列表
 *
 * @param {Array} fields
 * @returns
 */


function pureFields(fields) {
  return fields.filter(function (i) {
    return i;
  }).map(function (item) {
    return {
      label: item.options.base.label.value,
      field: item.options.field.value
    };
  });
}