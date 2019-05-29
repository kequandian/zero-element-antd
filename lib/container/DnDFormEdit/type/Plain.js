"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _default = function _default(_ref) {
  var config = _ref.config;
  var _config$options = config.options,
      options = _config$options === void 0 ? {} : _config$options;
  var _options$base = options.base,
      base = _options$base === void 0 ? {} : _options$base,
      _options$style = options.style,
      style = _options$style === void 0 ? {} : _options$style;
  var _base$value = base.value,
      value = _base$value === void 0 ? {} : _base$value;
  var styleObj = (0, _react.useMemo)(function () {
    var rst = {};
    Object.keys(style).forEach(function (key) {
      return rst[key] = style[key].value;
    });
    return rst;
  }, [style]);
  return _react["default"].createElement("span", {
    style: styleObj
  }, value.value);
};

exports["default"] = _default;