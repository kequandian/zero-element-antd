"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _qrcode = _interopRequireDefault(require("qrcode.react"));

var _default = function _default(props) {
  var config = props.config;
  var _config$options = config.options,
      options = _config$options === void 0 ? {} : _config$options;

  var _ref = options.base || {},
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? {} : _ref$value;

  return _react["default"].createElement(_qrcode["default"], {
    value: value.value
  });
};

exports["default"] = _default;