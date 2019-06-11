"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _default = function _default(_ref) {
  var props = _ref.props,
      value = _ref.value,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["props", "value"]);
  return _react["default"].createElement(_antd.Checkbox.Group, (0, _extends2["default"])({
    value: typeof value === 'string' ? [] : value
  }, rest, props));
};

exports["default"] = _default;