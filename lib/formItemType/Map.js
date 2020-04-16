"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _default = function _default(_ref) {
  var props = _ref.props,
      value = _ref.value,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options,
      defaultValue = _ref.defaultValue,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["props", "value", "options", "defaultValue"]);
  var _options$map = options.map,
      map = _options$map === void 0 ? {} : _options$map;
  var v = value || defaultValue;
  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, rest, props), map[v] || v);
};

exports["default"] = _default;