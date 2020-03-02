"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Canvas = _interopRequireDefault(require("../../DnDFormEdit/type/Canvas"));

var _Grid = _interopRequireDefault(require("./Grid"));

var _LTB = _interopRequireDefault(require("../../DnDFormEdit/type/LTB"));

var _Plain = _interopRequireDefault(require("../../DnDFormEdit/type/Plain"));

var _Group = _interopRequireDefault(require("../../DnDFormEdit/type/Group"));

var _Checkbox = _interopRequireDefault(require("../../DnDFormEdit/type/Checkbox"));

var _InputUnderline = _interopRequireDefault(require("./InputUnderline"));

var _Image = _interopRequireDefault(require("./Image"));

var _Qrcode = _interopRequireDefault(require("./Qrcode"));

var _Barcode = _interopRequireDefault(require("./Barcode"));

var _Table = _interopRequireDefault(require("./Table"));

var typeMap = {
  Canvas: _Canvas["default"],
  Grid: _Grid["default"],
  LTB: _LTB["default"],
  Plain: _Plain["default"],
  Group: _Group["default"],
  Checkbox: _Checkbox["default"],
  InputUnderline: _InputUnderline["default"],
  Image: _Image["default"],
  Qrcode: _Qrcode["default"],
  Barcode: _Barcode["default"],
  Table: _Table["default"]
};
var _default = typeMap;
exports["default"] = _default;