"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatToConfig;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function formatToConfig(cfg, formName) {
  var _ref;

  var _cfg$items = cfg.items,
      items = _cfg$items === void 0 ? [] : _cfg$items;

  var fields = (_ref = []).concat.apply(_ref, (0, _toConsumableArray2["default"])(items.map(function (row) {
    return row.items;
  })));

  var filterFields = fields.filter(function (field) {
    return field;
  });
  var config = {
    flows: [],
    page: 'A4',
    definitions: {} // name: formName || '打印模板',

  };
  filterFields.forEach(function (field) {
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
    columnsLayout: [],
    columnKeyBindings: [],
    rowHeight: 50,
    headerHeight: 40
  };
  table.forEach(function (f) {
    var label = f.label,
        value = f.value;
    config.columnKeyBindings.push({
      key: value,
      column: value
    });
  });
  return config;
}