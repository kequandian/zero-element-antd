"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = STable;

require("antd/lib/table/style/css");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _react = _interopRequireDefault(require("react"));

function STable(_ref) {
  var config = _ref.config;
  var _config$options = config.options,
      options = _config$options === void 0 ? {} : _config$options;
  var _options$base = options.base,
      base = _options$base === void 0 ? {} : _options$base,
      _options$table = options.table,
      table = _options$table === void 0 ? [] : _options$table;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_table["default"], {
    dataSource: [],
    columns: table.map(function (item) {
      return {
        title: item.label,
        dataIndex: item.value,
        key: item.value
      };
    })
  }));
}