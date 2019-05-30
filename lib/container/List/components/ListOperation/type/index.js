"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Dropdown = _interopRequireDefault(require("./Dropdown"));

var _Outside = _interopRequireDefault(require("./Outside"));

var _Switch = _interopRequireDefault(require("./Switch"));

var _Sort = _interopRequireDefault(require("./Sort"));

require("../../../index.css");

var operationMap = {
  'dropdown': _Dropdown["default"],
  'outside': _Outside["default"],
  'switch': _Switch["default"],
  'sort': _Sort["default"]
};
var _default = operationMap;
exports["default"] = _default;