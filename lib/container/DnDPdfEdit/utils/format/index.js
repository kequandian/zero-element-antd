"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatToConfig;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _unusualType = _interopRequireDefault(require("./unusualType"));

function formatToConfig(cfg, formName) {
  var _ref;

  var _cfg$items = cfg.items,
      items = _cfg$items === void 0 ? [] : _cfg$items;
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
    flows: [],
    page: {},
    definitions: {},
    name: formName || '打印模板'
  };
  fields.forEach(function (field) {
    var type = field.type,
        options = field.options;
    config.flows.push(formatType(type, options));
  });
  return [config, fields];
}

function formatType(type, options) {
  var map = {
    Table: fTable
  };
  return (map[type] || fUndefined)(options);
}

function fUndefined() {
  return {};
}

function fTable(options) {
  var _options$table = options.table,
      table = _options$table === void 0 ? [] : _options$table;
  var config = {
    element: {
      header: []
    },
    convert: {
      headerFields: []
    }
  };
  table.forEach(function (f) {
    var label = f.label,
        value = f.value;
    config.element.header.push(label);
    config.convert.headerFields.push(value);
  });
  return config;
}