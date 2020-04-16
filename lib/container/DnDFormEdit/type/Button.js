"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ButtonWrapped;

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _react = _interopRequireDefault(require("react"));

function ButtonWrapped(_ref) {
  var config = _ref.config;
  var _config$options = config.options,
      options = _config$options === void 0 ? {} : _config$options;
  var _options$base = options.base,
      base = _options$base === void 0 ? {} : _options$base,
      _options$style = options.style,
      style = _options$style === void 0 ? {} : _options$style,
      _options$items = options.items,
      items = _options$items === void 0 ? [] : _options$items,
      cfg = options.config;
  var _base$value = base.value,
      value = _base$value === void 0 ? {} : _base$value;
  var _cfg$title = cfg.title,
      title = _cfg$title === void 0 ? {} : _cfg$title;
  return /*#__PURE__*/_react["default"].createElement(_button["default"], null, title.value);
}