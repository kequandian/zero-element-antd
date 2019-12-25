"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypeCurrency;

var _react = _interopRequireDefault(require("react"));

var _tool = require("../../utils/tool");

function valueTypeCurrency(props) {
  var _props$options = props.options,
      options = _props$options === void 0 ? {} : _props$options,
      _props$data$text = props.data.text,
      text = _props$data$text === void 0 ? '' : _props$data$text;
  var _options$symbol = options.symbol,
      symbol = _options$symbol === void 0 ? '￥' : _options$symbol,
      color = options.color,
      nullPlaceholder = options.nullPlaceholder;
  var v;
  var s = symbol;

  if (text === null) {
    v = nullPlaceholder;
    s = '';
  }

  if (v === undefined) {
    v = returnFloat((0, _tool.toNumber)(text));
  }

  console.log(v);
  return _react["default"].createElement("div", {
    style: {
      color: color
    }
  }, "".concat(s, " ").concat(v.toLocaleString('en-US', {
    minimumSignificantDigits: 3
  })));
}

function returnFloat(value) {
  var value = Math.round(parseFloat(value) * 100) / 100;
  var s = value.toString().split(".");

  if (s.length == 1) {
    value = value.toString() + ".00";
    return value;
  }

  if (s.length > 1) {
    if (s[1].length < 2) {
      value = value.toString() + "0";
    }

    return value;
  }
}