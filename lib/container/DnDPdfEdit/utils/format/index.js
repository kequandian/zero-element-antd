"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatToConfig;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _unusualType = _interopRequireDefault(require("./unusualType"));

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
    if (field && _unusualType["default"][field.type]) {
      unusualFields.push({
        field: field,
        func: _unusualType["default"][field.type]
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

        var _field$options = field.options,
            options = _field$options === void 0 ? {} : _field$options;
        var _options$base = options.base,
            base = _options$base === void 0 ? {} : _options$base;
        var rst = {
          label: base.label && base.label.value || '',
          field: field.options.field.value,
          value: formatToValue(base),
          type: formatToType(field.type),
          props: {
            style: formatToStyle(field.options.style),
            placeholder: formatToPlaceholder(base)
          },
          rules: formatToRules(field.options.rules),
          options: formatToOptions(field.options.config),
          expect: formatToExpect(field.options.expect)
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
    var value = item.value,
        message = item.message;

    if (value && message) {
      return {
        type: value,
        message: message
      };
    }

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

function formatToExpect(expect) {
  if (expect && expect.expectedField) {
    return {
      expectedField: expect.expectedField.value,
      expectedValue: expect.expectedValue.value
    };
  }

  return undefined;
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
      label: item.options.base.label && item.options.base.label.value || '',
      field: item.options.field.value
    };
  });
}