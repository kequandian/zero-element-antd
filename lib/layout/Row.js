"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Row;

var _react = _interopRequireDefault(require("react"));

require("./index.css");

function Row(props) {
  var style = props.style,
      children = props.children;
  return _react["default"].createElement("div", {
    className: "ZEleA-Layout-Row",
    style: style
  }, children);
}