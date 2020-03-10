"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypeInputSelectFetch;

var _react = _interopRequireDefault(require("react"));

var _SelectFetch = _interopRequireDefault(require("../../formItemType/SelectFetch"));

function valueTypeInputSelectFetch(props) {
  var field = props.field,
      handle = props.handle,
      options = props.options,
      _props$data = props.data,
      index = _props$data.index,
      _props$data$text = _props$data.text,
      text = _props$data$text === void 0 ? '' : _props$data$text,
      record = _props$data.record;
  var onEdit = handle.onEdit;

  function handleChange(e) {
    var target = e.target;
    var value = target.value;
    record[field] = value;
    onEdit(index, record);
  }

  return _react["default"].createElement(_SelectFetch["default"], {
    value: text,
    options: options,
    onChange: handleChange
  });
}