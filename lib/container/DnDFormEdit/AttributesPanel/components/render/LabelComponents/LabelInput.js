"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LabelInput;

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _react = _interopRequireDefault(require("react"));

function LabelInput(_ref) {
  var field = _ref.field,
      label = _ref.label,
      value = _ref.value,
      handle = _ref.handle;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", null, label), /*#__PURE__*/_react["default"].createElement(_input["default"], {
    value: value,
    onChange: handle.bind(null, field)
  }));
}