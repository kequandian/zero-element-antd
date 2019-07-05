"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SelectWrapped;

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireDefault(require("react"));

function SelectWrapped(props) {
  var _props$options = props.options,
      options = _props$options === void 0 ? [] : _props$options;
  return _react["default"].createElement(_select["default"], null, options.map(function (option, i) {
    return _react["default"].createElement(_select["default"].Option, {
      value: option.value,
      key: i
    }, option.label);
  }));
}