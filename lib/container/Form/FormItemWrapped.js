"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormItemWrapped;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _formItemType = require("zero-element/lib/config/formItemType");

require("./index.css");

function FormItemWrapped(_ref) {
  var type = _ref.type,
      options = _ref.options,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["type", "options"]);
  return /*#__PURE__*/_react["default"].createElement(_formItemType.Render, (0, _extends2["default"])({
    n: type,
    options: options
  }, rest));
}