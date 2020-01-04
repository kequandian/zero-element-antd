"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SelectWrapped;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

function SelectWrapped(props) {
  var value = props.value,
      _props$options = props.options,
      options = _props$options === void 0 ? [] : _props$options,
      onChange = props.onChange,
      p = props.props,
      rest = (0, _objectWithoutProperties2["default"])(props, ["value", "options", "onChange", "props"]);

  function handleChange(value) {
    onChange(value);
  }

  return _react["default"].createElement(_select["default"], (0, _extends2["default"])({
    onChange: handleChange,
    value: value,
    style: {
      minWidth: 120
    }
  }, rest, p), options.map(function (option, i) {
    return _react["default"].createElement(_select["default"].Option, {
      value: option.value,
      key: i
    }, option.label);
  }));
}