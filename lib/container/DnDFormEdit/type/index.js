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

var _Input = _interopRequireDefault(require("./Input"));

var _Radio = _interopRequireDefault(require("./Radio"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _Date = _interopRequireDefault(require("./Date"));

var _OneMany = _interopRequireDefault(require("./OneMany"));

var typeMap = {
  Canvas: _Canvas["default"],
  Grid: _Grid["default"],
  LTB: _LTB["default"],
  Plain: _Plain["default"],
  Input: _Input["default"],
  Radio: _Radio["default"],
  Checkbox: _Checkbox["default"],
  Date: _Date["default"],
  OneMany: _OneMany["default"]
};
var _default = typeMap;
exports["default"] = _default;