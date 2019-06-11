"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LabelRadio;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

function LabelRadio(_ref) {
  var field = _ref.field,
      label = _ref.label,
      value = _ref.value,
      handle = _ref.handle,
      options = _ref.options;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", null, label), _react["default"].createElement(_antd.Radio.Group, {
    value: value,
    onChange: handle.bind(null, field)
  }, options.map(function (item) {
    return _react["default"].createElement(_antd.Radio, {
      key: item.value,
      value: item.value
    }, item.label);
  })));
}