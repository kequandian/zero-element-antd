"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _LayoutContainer = _interopRequireDefault(require("../wrapped/LayoutContainer"));

var _Render = _interopRequireDefault(require("../utils/Render"));

var _default = function _default(props) {
  return _react["default"].createElement(_Render["default"], props);
};

exports["default"] = _default;