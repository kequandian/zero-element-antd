"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypePercentage;

var _react = _interopRequireDefault(require("react"));

var _tool = require("../../utils/tool");

function valueTypePercentage(props) {
  var _props$options = props.options,
      options = _props$options === void 0 ? {} : _props$options,
      _props$data$text = props.data.text,
      text = _props$data$text === void 0 ? '' : _props$data$text;
  var color = options.color,
      nullPlaceholder = options.nullPlaceholder;
  var v;

  if (text === null) {
    v = nullPlaceholder;
  }

  if (v === undefined) {
    v = (0, _tool.returnFloatOne)((0, _tool.toNumber)(text));
  }

  return _react["default"].createElement("div", {
    style: {
      color: color
    }
  }, "".concat(v, " %"));
}