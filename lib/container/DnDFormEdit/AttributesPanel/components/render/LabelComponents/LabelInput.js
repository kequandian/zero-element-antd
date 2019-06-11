"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LabelInput;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

function LabelInput(_ref) {
  var field = _ref.field,
      label = _ref.label,
      value = _ref.value,
      handle = _ref.handle;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", null, label), _react["default"].createElement(_antd.Input, {
    value: value,
    onChange: handle.bind(null, field)
  }));
}