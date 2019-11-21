"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _default = function _default(_ref) {
  var config = _ref.config;
  var _config$options = config.options,
      options = _config$options === void 0 ? {} : _config$options;
  var _options$base = options.base,
      base = _options$base === void 0 ? {} : _options$base;
  var _base$value = base.value,
      value = _base$value === void 0 ? {} : _base$value;
  return _react["default"].createElement("div", {
    style: {
      fontSize: 18,
      color: '#0189ff',
      display: 'flex'
    }
  }, _react["default"].createElement("div", {
    style: {
      width: 4,
      height: 26,
      backgroundColor: '#0198ff',
      marginRight: 2
    }
  }), _react["default"].createElement("div", null, value.value));
};

exports["default"] = _default;