"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _default = function _default(_ref) {
  var config = _ref.config;
  var _config$options = config.options,
      options = _config$options === void 0 ? {} : _config$options;

  var _ref2 = options.base || {},
      _ref2$value = _ref2.value,
      value = _ref2$value === void 0 ? {} : _ref2$value;

  return _react["default"].createElement(_antd.Input, {
    value: value.value
  });
};

exports["default"] = _default;