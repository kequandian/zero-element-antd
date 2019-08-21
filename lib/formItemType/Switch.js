"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SwitchWrapped;

require("antd/lib/switch/style/css");

var _switch = _interopRequireDefault(require("antd/lib/switch"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var checkedMap = {
  'true': true,
  'false': false
};

function SwitchWrapped(props) {
  var value = props.value,
      _props$options = props.options,
      options = _props$options === void 0 ? {} : _props$options,
      onChange = props.onChange,
      p = props.props;

  function hanldeChange(value) {
    onChange(value);
  }

  return _react["default"].createElement(_switch["default"], (0, _extends2["default"])({
    checked: checkedMap[value],
    onChange: hanldeChange
  }, options, p));
}