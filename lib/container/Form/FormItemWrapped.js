"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormItemWrapped;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _formItenType = require("zero-element-global/lib/formItenType");

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

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("label", null, "".concat(label, ": ")), _react["default"].createElement(_antd.Tooltip, {
    visible: visibleError,
    title: meta.error,
    arrowPointAtCenter: true,
    overlayClassName: "ZEle-Form-ruleTips"
  }, _react["default"].createElement(_formItenType.Render, (0, _extends2["default"])({
    n: type,
    className: visibleError ? 'ZEle-Form-ruleTips-error' : '',
    options: options
  }, input, rest))));
}