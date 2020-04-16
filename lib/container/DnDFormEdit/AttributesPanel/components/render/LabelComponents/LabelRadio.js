"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LabelRadio;

require("antd/lib/radio/style/css");

var _radio = _interopRequireDefault(require("antd/lib/radio"));

var _react = _interopRequireDefault(require("react"));

function LabelRadio(_ref) {
  var field = _ref.field,
      label = _ref.label,
      value = _ref.value,
      handle = _ref.handle,
      options = _ref.options;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", null, label), /*#__PURE__*/_react["default"].createElement(_radio["default"].Group, {
    value: value,
    onChange: handle.bind(null, field)
  }, options.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_radio["default"], {
      key: item.value,
      value: item.value
    }, item.label);
  })));
}