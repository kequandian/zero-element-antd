"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SSelect;

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireDefault(require("react"));

var Option = _select["default"].Option;

function SSelect(_ref) {
  var config = _ref.config;
  var _config$options = config.options,
      options = _config$options === void 0 ? {} : _config$options;
  var _options$base = options.base,
      base = _options$base === void 0 ? {} : _options$base,
      _options$style = options.style,
      style = _options$style === void 0 ? {} : _options$style,
      _options$items = options.items,
      items = _options$items === void 0 ? [] : _options$items;
  var _base$value = base.value,
      value = _base$value === void 0 ? {} : _base$value;
  return _react["default"].createElement(_select["default"], {
    value: [value.value],
    style: {
      width: 120
    }
  }, items.map(function (item) {
    return _react["default"].createElement(Option, {
      key: item.value,
      value: item.value
    }, item.label);
  }));
}