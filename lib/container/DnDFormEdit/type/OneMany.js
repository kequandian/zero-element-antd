"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SRadio;

require("antd/lib/table/style/css");

var _table = _interopRequireDefault(require("antd/lib/table"));

require("antd/lib/typography/style/css");

var _typography = _interopRequireDefault(require("antd/lib/typography"));

var _react = _interopRequireDefault(require("react"));

var Title = _typography["default"].Title,
    Text = _typography["default"].Text;

function SRadio(_ref) {
  var config = _ref.config;
  var _config$options = config.options,
      options = _config$options === void 0 ? {} : _config$options;
  var _options$base = options.base,
      base = _options$base === void 0 ? {} : _options$base,
      _options$advanced = options.advanced,
      advanced = _options$advanced === void 0 ? {} : _options$advanced,
      _options$table = options.table,
      table = _options$table === void 0 ? [] : _options$table;
  var _advanced$sql = advanced.sql,
      sql = _advanced$sql === void 0 ? {} : _advanced$sql,
      tableName = advanced.tableName;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(Title, {
    level: 4
  }, "\u4E00\u5BF9\u591A\u5173\u7CFB:", sql.value ? _react["default"].createElement(Text, {
    code: true
  }, sql.value) : '[未关联]', tableName.value ? _react["default"].createElement(Text, {
    code: true
  }, tableName.value) : '[未关联]'), _react["default"].createElement(_table["default"], {
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