"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CheckboxWrapped;

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

var _react = _interopRequireDefault(require("react"));

function CheckboxWrapped(_ref) {
  var field = _ref.field,
      data = _ref.data,
      onChange = _ref.onChange,
      onMsgChange = _ref.onMsgChange;

  var _ref2 = data || {},
      label = _ref2.label,
      value = _ref2.value,
      message = _ref2.message;

  function handleChange(e) {
    onChange(field, e.target.checked ? field : undefined);
  }

  function handleMsgChange(e) {
    onMsgChange(field, e.target.value);
  }

  if (data) {
    if (message !== undefined) {
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_checkbox["default"], {
        checked: value === field,
        onChange: handleChange
      }, label), /*#__PURE__*/_react["default"].createElement(_input["default"], {
        value: message,
        onChange: handleMsgChange
      }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null));
    }

    return /*#__PURE__*/_react["default"].createElement(_checkbox["default"], {
      checked: value === field,
      onChange: handleChange
    }, label);
  }

  return null;
}