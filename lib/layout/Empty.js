"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Empty;

var _react = _interopRequireDefault(require("react"));

require("./index.css");

function Empty(props) {
  var style = props.style,
      children = props.children;
  return _react["default"].createElement("div", {
    style: style
  }, children);
}