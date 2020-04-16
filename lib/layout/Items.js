"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Items;

var _react = _interopRequireDefault(require("react"));

require("./index.css");

function Items(props) {
  var children = props.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-Layout-Items"
  }, children);
}