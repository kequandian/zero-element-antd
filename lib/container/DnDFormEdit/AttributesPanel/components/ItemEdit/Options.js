"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Options;

require("antd/lib/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

require("antd/lib/modal/style/css");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireWildcard(require("react"));

var _ModalRadio = _interopRequireDefault(require("./ModalRadio"));

var Option = _select["default"].Option;

function Options(_ref) {
  var index = _ref.index,
      data = _ref.data,
      disabled = _ref.disabled,
      onChange = _ref.onChange;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      optionsData = _useState4[0],
      setOptionsData = _useState4[1];

  function handleChange(field, value) {
    onChange(index, field, value);
  }

  function handleOptionsChange(value) {
    setOptionsData(value);
  }

  function handleVisible() {
    if (!visible) {
      setOptionsData(data.options);
    }

    setVisible(!visible);
  }

  function handleOptionsSave() {
    handleVisible();
    onChange(index, 'options', optionsData);
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
    value: data.echoType,
    disabled: disabled,
    onChange: handleChange
  }), data.type === 'modal-radio' ? _react["default"].createElement("div", null, _react["default"].createElement("br", null), _react["default"].createElement(_button["default"], {
    onClick: handleVisible
  }, "\u7F16\u8F91\u914D\u7F6E"), _react["default"].createElement(_modal["default"], {
    title: "\u7F16\u8F91 \u6A21\u6001\u6846-\u5217\u8868\u5355\u9009 \u914D\u7F6E",
    visible: visible,
    onCancel: handleVisible,
    onOk: handleOptionsSave
  }, _react["default"].createElement(_ModalRadio["default"], {
    data: optionsData,
    onChange: handleOptionsChange
  }))) : null);
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
  }, "\u65F6\u95F4"), _react["default"].createElement(Option, {
    value: "modal-radio"
  }, "\u6A21\u6001\u6846-\u5217\u8868\u5355\u9009")));
}