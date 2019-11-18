"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = InputWrapped;

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _react = _interopRequireDefault(require("react"));

function InputWrapped(_ref) {
  var label = _ref.label,
      field = _ref.field,
      value = _ref.value,
      onChange = _ref.onChange;
  return _react["default"].createElement(_react["default"].Fragment, null, label, _react["default"].createElement(_input["default"], {
    onChange: onChange.bind(null, field),
    value: value
  }));
}