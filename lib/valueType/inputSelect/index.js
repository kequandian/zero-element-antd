"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypeInputSelect;

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireDefault(require("react"));

function valueTypeInputSelect(props) {
  var field = props.field,
      handle = props.handle,
      options = props.options,
      _props$data = props.data,
      index = _props$data.index,
      _props$data$text = _props$data.text,
      text = _props$data$text === void 0 ? '' : _props$data$text,
      record = _props$data.record;
  var onEdit = handle.onEdit;
  var _options$width = options.width,
      width = _options$width === void 0 ? 120 : _options$width,
      _options$options = options.options,
      opts = _options$options === void 0 ? [] : _options$options;

  function handleChange(value) {
    record[field] = value;
    onEdit(index, record);
  }

  return _react["default"].createElement(_select["default"], {
    onChange: handleChange,
    value: text,
    style: {
      minWidth: width
    }
  }, opts.map(function (option, i) {
    return _react["default"].createElement(_select["default"].Option, {
      value: option.value,
      key: i
    }, option.label);
  }));
}