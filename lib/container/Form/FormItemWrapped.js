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
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["label", "type", "input", "meta", "options"]);
  var visibleError = Boolean(meta.error && meta.touched);

  if (type === 'empty') {
    return _react["default"].createElement(_react["default"].Fragment, null);
  }

  return _react["default"].createElement("div", {
    className: "ZEleA-Form-item"
  }, label ? _react["default"].createElement("label", {
    className: "ZEleA-Form-item-label"
  }, "".concat(label, ":")) : null, _react["default"].createElement(_tooltip["default"], {
    visible: visibleError,
    title: meta.error,
    arrowPointAtCenter: true,
    overlayClassName: "ZEleA-Form-ruleTips"
  }, _react["default"].createElement(_formItemType.Render, (0, _extends2["default"])({
    n: type,
    className: "ZEleA-Form-item-element ".concat(visibleError ? 'ZEleA-Form-ruleTips-error' : ''),
    options: options
  }, input, rest))));
}