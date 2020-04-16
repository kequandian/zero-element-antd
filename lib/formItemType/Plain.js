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
  var name = props.name,
      namespace = props.namespace,
      propsOtp = props.props,
      defaultValue = props.defaultValue,
      _props$value = props.value,
      value = _props$value === void 0 ? defaultValue : _props$value,
      options = props.options,
      rest = (0, _objectWithoutProperties2["default"])(props, ["name", "namespace", "props", "defaultValue", "value", "options"]);
  var format = options.format,
      _options$placeholder = options.placeholder,
      placeholder = _options$placeholder === void 0 ? '-' : _options$placeholder,
      map = options.map;
  var v = value;

  if (format) {
    v = (0, _format.formatAPI)(format, {
      namespace: namespace,
      placeholder: placeholder
    });
  }

  if (map) {
    v = map[v];
  }

  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, rest, propsOtp), String(v === undefined ? placeholder : v));
};

exports["default"] = _default;