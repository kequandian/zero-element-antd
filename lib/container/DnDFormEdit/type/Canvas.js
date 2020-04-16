"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

require("../index.css");

var _default = function _default(props) {
  var children = props.children,
      parentId = props.parentId,
      options = props.options;
  return /*#__PURE__*/_react["default"].createElement("div", null, children);
};

exports["default"] = _default;