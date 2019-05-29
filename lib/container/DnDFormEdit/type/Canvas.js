"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _LayoutContainer = _interopRequireDefault(require("../wrapped/LayoutContainer"));

require("../index.css");

var _default = function _default(props) {
  var children = props.children,
      parentId = props.parentId,
      options = props.options;
  return _react["default"].createElement("div", null, children, _react["default"].createElement(_LayoutContainer["default"], null));
};

exports["default"] = _default;