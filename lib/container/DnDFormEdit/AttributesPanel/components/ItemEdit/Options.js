"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Options;

require("antd/lib/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireDefault(require("react"));

var Option = _select["default"].Option;

function Options(_ref) {
  var index = _ref.index,
      data = _ref.data,
      disabled = _ref.disabled,
      onChange = _ref.onChange;

  function handleChange(field, value) {
    onChange(index, field, value);
  }

  if (!data) return null;
  return _react["default"].createElement("div", null, _react["default"].createElement(CheckboxWrapped, {
    title: "\u663E\u793A\u5728\u65B0\u589E\u754C\u9762",
    field: "echoAdd",
    value: data.echoAdd,
    disabled: disabled,
    onChange: handleChange
  }), _react["default"].createElement(CheckboxWrapped, {
    title: "\u663E\u793A\u5728\u7F16\u8F91\u754C\u9762",
    field: "echoEdit",
    value: data.echoEdit,
    disabled: disabled,
    onChange: handleChange
  }), _react["default"].createElement(SelectWrapped, {
    title: "\u5B57\u6BB5\u7C7B\u578B",
    field: "type",
    value: data.type,
    disabled: disabled,
    onChange: handleChange
  }));
}

function CheckboxWrapped(_ref2) {
  var title = _ref2.title,
      field = _ref2.field,
      value = _ref2.value,
      disabled = _ref2.disabled,
      onChange = _ref2.onChange;

  function handleChange(e) {
    onChange(field, e.target.checked);
  }

  if (value === undefined) return null;
  return _react["default"].createElement("div", null, _react["default"].createElement(_checkbox["default"], {
    disabled: disabled,
    checked: value,
    onChange: handleChange
  }, title));
}

function SelectWrapped(_ref3) {
  var title = _ref3.title,
      field = _ref3.field,
      value = _ref3.value,
      disabled = _ref3.disabled,
      onChange = _ref3.onChange;

  function handleChange(value) {
    onChange(field, value);
  }

  if (value === undefined) return null;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", null, title), _react["default"].createElement(_select["default"], {
    style: {
      width: 165
    },
    disabled: disabled,
    value: value,
    onChange: handleChange
  }, _react["default"].createElement(Option, {
    value: "plain"
  }, "\u7EAF\u6587\u672C"), _react["default"].createElement(Option, {
    value: "input"
  }, "\u8F93\u5165\u6846"), _react["default"].createElement(Option, {
    value: "number"
  }, "\u6570\u503C\u8F93\u5165\u6846"), _react["default"].createElement(Option, {
    value: "date"
  }, "\u65F6\u95F4")));
}