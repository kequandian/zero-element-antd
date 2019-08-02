"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Alone;

var _react = _interopRequireDefault(require("react"));

require("./index.css");

function Alone(props) {
  var style = props.style,
      children = props.children;
  return _react["default"].createElement("div", {
    style: style,
    className: "ZEleA-Layout-Alone"
  }, children);
}