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
      defaultValue = _ref.defaultValue,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["props", "value", "defaultValue"]);
  return _react["default"].createElement("div", (0, _extends2["default"])({}, rest, props), value || defaultValue);
};

exports["default"] = _default;