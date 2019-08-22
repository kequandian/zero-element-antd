"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/switch/style/css");

var _switch = _interopRequireDefault(require("antd/lib/switch"));

var _react = _interopRequireDefault(require("react"));

var _default = function _default(item, i, _ref, onAction) {
  var index = _ref.index,
      record = _ref.record;
  var _item$options$field = item.options.field,
      field = _item$options$field === void 0 ? 'enabled' : _item$options$field;
  var enabled = Boolean(record[field]);
  return _react["default"].createElement("span", {
    key: i,
    onClick: onAction.bind(null, item.action, item.options)
  }, _react["default"].createElement(_switch["default"], {
    size: "small",
    checked: enabled
  }));
};

exports["default"] = _default;