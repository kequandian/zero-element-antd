"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Content;

var _react = _interopRequireDefault(require("react"));

require("./index.css");

function Content(_ref) {
  var children = _ref.children;
  return _react["default"].createElement("div", {
    className: "ZEleA-Layout-Content"
  }, children);
}