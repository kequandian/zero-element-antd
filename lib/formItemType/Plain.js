"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _format = require("zero-element/lib/utils/format");

var _default = function _default(props) {
  var namespace = props.namespace,
      propsOtp = props.props,
      value = props.value,
      defaultValue = props.defaultValue,
      options = props.options,
      rest = (0, _objectWithoutProperties2["default"])(props, ["namespace", "props", "value", "defaultValue", "options"]);
  var format = options.format,
      _options$placeholder = options.placeholder,
      placeholder = _options$placeholder === void 0 ? '-' : _options$placeholder;
  var v = value || defaultValue;

  if (format) {
    v = (0, _format.formatAPI)(format, {
      namespace: namespace,
      placeholder: placeholder
    });
  }

  return _react["default"].createElement("div", (0, _extends2["default"])({}, rest, propsOtp), String(v || placeholder));
};

exports["default"] = _default;