"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypeInputNumber;

require("antd/lib/input-number/style/css");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

var _react = _interopRequireDefault(require("react"));

var _tool = require("../../utils/tool");

function valueTypeInputNumber(props) {
  var field = props.field,
      handle = props.handle,
      _props$data = props.data,
      index = _props$data.index,
      _props$data$text = _props$data.text,
      text = _props$data$text === void 0 ? '' : _props$data$text,
      record = _props$data.record;
  var onEdit = handle.onEdit;
  var v = (0, _tool.toNumber)(text);

  function handleChange(value) {
    record[field] = (0, _tool.toNumber)(value);
    onEdit(index, record);
  }

  return _react["default"].createElement(_inputNumber["default"], {
    value: v,
    onChange: handleChange
  });
}