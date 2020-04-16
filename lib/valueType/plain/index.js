"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypePlain;

var _react = _interopRequireDefault(require("react"));

function valueTypePlain(props) {
  var _props$options = props.options,
      options = _props$options === void 0 ? {} : _props$options,
      _props$data$text = props.data.text,
      text = _props$data$text === void 0 ? '' : _props$data$text;
  var style = options.style;
  return /*#__PURE__*/_react["default"].createElement("span", {
    style: style
  }, text);
}