"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatToConfig;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function formatToConfig(cfg) {
  var _ref, _ref2;

  var _cfg$items = cfg.items,
      items = _cfg$items === void 0 ? [] : _cfg$items;
  var config = {
    layout: 'Content',
    title: '表单',
    items: []
  };
  var count = 0;
  config.items.push({
    layout: 'Empty',
    component: 'BaseForm',
    config: {
      layout: 'Grid',
      layoutConfig: {
        layoutArea: (_ref = []).concat.apply(_ref, (0, _toConsumableArray2["default"])(items.map(function (row) {
          return {
            layout: row.type,
            length: row.items.length,
            value: row.value
          };
        })))
      },
      fields: (_ref2 = []).concat.apply(_ref2, (0, _toConsumableArray2["default"])(items.map(function (row) {
        return row.items.map(function (field) {
          if (!field) {
            return {
              label: '',
              field: "empty_".concat(count++),
              type: 'empty'
            };
          }

          var rst = {
            label: field.options.base.label.value || '',
            field: field.options.base.field.value,
            value: field.options.base.value.value,
            type: field.type.toLowerCase(),
            props: {
              style: formatToStyle(field.options.style),
              placeholder: formatToPlaceholder(field.options.base)
            }
          };

          if (field.options.items) {
            rst.options = field.options.items;
          }

          return rst;
        });
      })))
    }
  });
  return config;
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