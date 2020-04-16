"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypeInputText;

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _react = _interopRequireDefault(require("react"));

function valueTypeInputText(props) {
  var field = props.field,
      handle = props.handle,
      _props$data = props.data,
      index = _props$data.index,
      _props$data$text = _props$data.text,
      text = _props$data$text === void 0 ? '' : _props$data$text,
      record = _props$data.record;
  var onEdit = handle.onEdit;

  function handleChange(e) {
    var value = e.target.value;
    record[field] = value;
    onEdit(index, record);
  }

  return /*#__PURE__*/_react["default"].createElement(_input["default"], {
    value: text,
    onChange: handleChange
  });
}