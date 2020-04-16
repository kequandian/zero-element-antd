"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderStyleOptions = renderStyleOptions;
exports.renderBaseOptions = renderBaseOptions;
exports.renderAdvancedOptions = renderAdvancedOptions;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _LabelInput = _interopRequireDefault(require("./LabelComponents/LabelInput"));

var _LabelRadio = _interopRequireDefault(require("./LabelComponents/LabelRadio"));

var _SelectSQL = _interopRequireDefault(require("./LabelComponents/SelectSQL"));

var _SelectTable = _interopRequireDefault(require("./LabelComponents/SelectTable"));

var _SelectTableField = _interopRequireDefault(require("./LabelComponents/SelectTableField"));

var _TableField = _interopRequireDefault(require("./LabelComponents/TableField"));

var _SaveData = _interopRequireDefault(require("./LabelComponents/SaveData"));

var labelSet = {
  'input': _LabelInput["default"],
  'radio': _LabelRadio["default"],
  'selectSQL': _SelectSQL["default"],
  'selectTable': _SelectTable["default"],
  'selectTableField': _SelectTableField["default"],
  'tableField': _TableField["default"],
  'saveData': _SaveData["default"],
  'undefined': _LabelInput["default"]
};

function renderStyleOptions(opt, handle) {
  return Object.keys(opt).map(function (key) {
    var type = opt[key].type;
    var Match = labelSet[type];
    return /*#__PURE__*/_react["default"].createElement(Match, (0, _extends2["default"])({
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
    return /*#__PURE__*/_react["default"].createElement(Match, (0, _extends2["default"])({
      key: key,
      field: key,
      handle: handle
    }, opt[key]));
  });
}

function renderAdvancedOptions(opt, options, handle, props) {
  return Object.keys(opt).map(function (key) {
    var type = opt[key].type;
    var Match = labelSet[type];
    return /*#__PURE__*/_react["default"].createElement(Match, (0, _extends2["default"])({
      key: key,
      field: key,
      handle: handle
    }, opt[key], {
      options: options,
      config: opt
    }, props));
  });
}