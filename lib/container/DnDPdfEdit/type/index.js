"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _Grid = _interopRequireDefault(require("./Grid"));

var _LTB = _interopRequireDefault(require("./LTB"));

var _Plain = _interopRequireDefault(require("./Plain"));

var _Group = _interopRequireDefault(require("./Group"));

var _InputUnderline = _interopRequireDefault(require("./InputUnderline"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var typeMap = {
  Canvas: _Canvas["default"],
  Grid: _Grid["default"],
  LTB: _LTB["default"],
  Plain: _Plain["default"],
  Group: _Group["default"],
  InputUnderline: _InputUnderline["default"],
  Checkbox: _Checkbox["default"]
};
var _default = typeMap;
exports["default"] = _default;