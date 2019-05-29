"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Radio;

var _react = _interopRequireWildcard(require("react"));

var _SRadio = _interopRequireDefault(require("./SRadio"));

var Item = _SRadio["default"].Item;

function Radio(_ref) {
  var config = _ref.config;
  var _config$options = config.options,
      options = _config$options === void 0 ? {} : _config$options;
  var _options$base = options.base,
      base = _options$base === void 0 ? {} : _options$base,
      _options$style = options.style,
      style = _options$style === void 0 ? {} : _options$style,
      _options$items = options.items,
      items = _options$items === void 0 ? [] : _options$items;
  var _base$value = base.value,
      value = _base$value === void 0 ? {} : _base$value;
  return _react["default"].createElement(_SRadio["default"], {
    value: value.value
  }, items.map(function (item, i) {
    return _react["default"].createElement(Item, {
      key: i,
      value: item.value
    }, item.label);
  }));
}