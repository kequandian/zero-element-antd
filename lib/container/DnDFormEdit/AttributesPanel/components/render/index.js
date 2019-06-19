"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderStyleOptions = renderStyleOptions;
exports.renderBaseOptions = renderBaseOptions;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _LabelInput = _interopRequireDefault(require("./LabelComponents/LabelInput"));

var _LabelRadio = _interopRequireDefault(require("./LabelComponents/LabelRadio"));

var labelSet = {
  'input': _LabelInput["default"],
  'radio': _LabelRadio["default"],
  'undefined': _LabelInput["default"]
};

function renderStyleOptions(opt, handle) {
  return Object.keys(opt).map(function (key) {
    var type = opt[key].type;
    var Match = labelSet[type];
    return _react["default"].createElement(Match, (0, _extends2["default"])({
      key: key,
      field: key,
      handle: handle
    }, opt[key]));
  });
}

function renderBaseOptions(opt, handle) {
  return Object.keys(opt).map(function (key) {
    var type = opt[key].type;
    var Match = labelSet[type];
    return _react["default"].createElement(Match, (0, _extends2["default"])({
      key: key,
      field: key,
      handle: handle
    }, opt[key]));
  });
}