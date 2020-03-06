"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypeEllipsis;

require("antd/lib/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

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
      max = _options$max === void 0 ? 16 : _options$max,
      textTemp = options.textTemp,
      textTempFields = options.textTempFields,
      _options$textTempNull = options.textTempNull,
      textTempNull = _options$textTempNull === void 0 ? '' : _options$textTempNull;

  var _useState = (0, _react.useState)(text),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      t = _useState2[0],
      setT = _useState2[1];

  (0, _react.useEffect)(function (_) {
    if (textTemp && Array.isArray(textTempFields)) {
      var rst = textTemp;
      textTempFields.forEach(function (key) {
        var v = record[key];
        var toValue = v || v === 0 ? v : textTempNull;
        rst = rst.replace("{".concat(key, "}"), toValue);
      });
      setT(rst);
    } else {
      setT(String(text));
    }
  }, [text, textTemp]);
  if (!t || t === 'null') return null;
  return t.length < max ? t : _react["default"].createElement(_tooltip["default"], {
    title: t
  }, t.slice(0, max), "...");
}