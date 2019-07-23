"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _default = function _default(_ref) {
  var props = _ref.props,
      value = _ref.value,
      defaultValue = _ref.defaultValue;
  return _react["default"].createElement("div", props, value || defaultValue);
};

exports["default"] = _default;