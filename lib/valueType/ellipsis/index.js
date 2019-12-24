"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypeEllipsis;

require("antd/lib/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

var _react = _interopRequireDefault(require("react"));

function valueTypeEllipsis(props) {
  var field = props.field,
      _props$options = props.options,
      options = _props$options === void 0 ? {} : _props$options,
      _props$data = props.data,
      index = _props$data.index,
      _props$data$text = _props$data.text,
      text = _props$data$text === void 0 ? '' : _props$data$text,
      record = _props$data.record;
  var _options$max = options.max,
      max = _options$max === void 0 ? 16 : _options$max;
  var t = String(text);
  return t.length < max ? t : _react["default"].createElement(_tooltip["default"], {
    title: t
  }, t.slice(0, max), "...");
}