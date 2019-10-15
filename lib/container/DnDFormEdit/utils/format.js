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
    config.items.push({
      layout: 'Empty',
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
        })
      }
    });
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
    layout: 'Content',
    title: formName || '表单',
    items: []
  };
  var count = 0;
  config.items.push({
    layout: 'Empty',
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
          type: field.type.toLowerCase(),
          props: {
            style: formatToStyle(field.options.style),
            placeholder: formatToPlaceholder(field.options.base)
          },
          rules: formatToRules(field.options.rules)
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
    return item.options.field.value;
  });
}