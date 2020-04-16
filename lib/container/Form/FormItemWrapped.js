"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormItemWrapped;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _formItemType = require("zero-element-global/lib/formItemType");

require("./index.css");

function FormItemWrapped(_ref) {
  var label = _ref.label,
      type = _ref.type,
      input = _ref.input,
      meta = _ref.meta,
      options = _ref.options,
      required = _ref.required,
      style = _ref.style,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["label", "type", "input", "meta", "options", "required", "style"]);
  var visibleError = Boolean(meta.error && meta.touched);
  var labelClassNames = ['ZEleA-Form-item-label', required ? 'ZEleA-Form-item-required' : '', label ? 'ZEleA-Form-item-label-colon' : ''];
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style,
    className: "ZEleA-Form-item"
  }, label ? /*#__PURE__*/_react["default"].createElement("label", {
    className: labelClassNames.join(' ')
  }, label) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-Form-item-element"
  }, /*#__PURE__*/_react["default"].createElement(_formItemType.Render, (0, _extends2["default"])({
    n: type,
    className: visibleError ? 'ZEleA-Form-ruleTips-error' : '',
    options: options
  }, input, rest))), /*#__PURE__*/_react["default"].createElement("div", (0, _defineProperty2["default"])({
    className: "ZEleA-Form-ruleTips"
  }, "className", visibleError ? 'ZEleA-Form-ruleTips error' : 'ZEleA-Form-ruleTips'), visibleError ? meta.error : null));
}