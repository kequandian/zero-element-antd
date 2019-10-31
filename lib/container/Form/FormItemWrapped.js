"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormItemWrapped;

require("antd/lib/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

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
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["label", "type", "input", "meta", "options", "required"]);
  var visibleError = Boolean(meta.error && meta.touched);

  if (type === 'hidden') {
    return _react["default"].createElement(_react["default"].Fragment, null);
  }

  var labelClassNames = ['ZEleA-Form-item-label', required ? 'ant-form-item-required' : '', label ? 'ZEleA-Form-item-label-colon' : ''];
  return _react["default"].createElement("div", {
    className: "ZEleA-Form-item"
  }, label ? _react["default"].createElement("label", {
    className: labelClassNames.join(' ')
  }, label) : null, _react["default"].createElement(_tooltip["default"], {
    visible: visibleError,
    title: meta.error,
    placement: "topLeft",
    overlayClassName: "ZEleA-Form-ruleTips"
  }, _react["default"].createElement("div", {
    className: "ZEleA-Form-item-element"
  }, _react["default"].createElement(_formItemType.Render, (0, _extends2["default"])({
    n: type,
    className: visibleError ? 'ZEleA-Form-ruleTips-error' : '',
    options: options
  }, input, rest)))));
}