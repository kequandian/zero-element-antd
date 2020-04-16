"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SCheckbox;

require("antd/lib/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

var _react = _interopRequireDefault(require("react"));

function SCheckbox(_ref) {
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
  return /*#__PURE__*/_react["default"].createElement(_checkbox["default"].Group, {
    options: items,
    value: [value]
  });
}