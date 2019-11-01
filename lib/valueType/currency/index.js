"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypeCurrency;

var _react = _interopRequireDefault(require("react"));

function valueTypeCurrency(props) {
  var _props$options = props.options,
      options = _props$options === void 0 ? {} : _props$options,
      _props$data$text = props.data.text,
      text = _props$data$text === void 0 ? '' : _props$data$text;
  var _options$symbol = options.symbol,
      symbol = _options$symbol === void 0 ? '￥' : _options$symbol;
  var v = Number(text);

  if (isNaN(v)) {
    v = text;
  }

  return "".concat(symbol, " ").concat(v.toLocaleString('en-US'));
}