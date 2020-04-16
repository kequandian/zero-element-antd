"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Content;

var _react = _interopRequireDefault(require("react"));

require("./index.css");

function Content(props) {
  var title = props.title,
      style = props.style,
      children = props.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style,
    className: "ZEleA-Layout-Content"
  }, title ? /*#__PURE__*/_react["default"].createElement("h2", null, title) : null, children);
}