"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = RequiredCheckbox;

require("antd/lib/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

var _react = _interopRequireWildcard(require("react"));

function RequiredCheckbox(_ref) {
  var data = _ref.data,
      onChange = _ref.onChange;

  function handleChange(e) {
    onChange('required', e.target.checked ? 'required' : undefined);
  }

  if (data.required) {
    return _react["default"].createElement(_checkbox["default"], {
      checked: data.required.value === 'required',
      onChange: handleChange
    }, "\u5FC5\u586B");
  }

  return null;
}