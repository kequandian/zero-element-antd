"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ImageView = _interopRequireDefault(require("../../../components/ImageView"));

var _default = function _default(props) {
  var config = props.config;
  var _config$options = config.options,
      options = _config$options === void 0 ? {} : _config$options;

  var _ref = options.base || {},
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? {} : _ref$value,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? {} : _ref$placeholder;

  return _react["default"].createElement("div", null, value.value ? _react["default"].createElement(_ImageView["default"], {
    value: value.value
  }) : _react["default"].createElement("div", null, "\u6682\u65E0\u56FE\u7247"));
};

exports["default"] = _default;