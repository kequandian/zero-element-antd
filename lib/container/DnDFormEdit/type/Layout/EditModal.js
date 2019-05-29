"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var Text = _antd.Typography.Text;

var _default = function _default(_ref) {
  var visible = _ref.visible,
      onSave = _ref.onSave,
      onCancel = _ref.onCancel,
      config = _ref.config;
  var title = config.title,
      value = config.value,
      tips = config.tips;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var inputEl = (0, _react.useRef)(null);

  function handleSave() {
    setError('');
    var newValue = inputEl.current.state.value;

    try {
      onSave(JSON.parse(newValue));
    } catch (error) {
      setError('输入了无效的 JSON 格式');
      inputEl.current.focus();
    }
  }

  return _react["default"].createElement(_antd.Modal, {
    visible: visible,
    title: "\u7F16\u8F91\u6574\u884C\u7684\u5E03\u5C40\u914D\u7F6E",
    onCancel: onCancel,
    onOk: handleSave
  }, _react["default"].createElement("div", null, _react["default"].createElement(Text, null, "\u5E03\u5C40\u7C7B\u578B\u540D: ")), _react["default"].createElement("div", null, _react["default"].createElement(Text, {
    strong: true
  }, title)), _react["default"].createElement("br", null), _react["default"].createElement("div", null, _react["default"].createElement(Text, null, "\u5E03\u5C40\u914D\u7F6E: ")), _react["default"].createElement(_antd.Input, {
    ref: inputEl,
    defaultValue: JSON.stringify(value)
  }), _react["default"].createElement("div", {
    style: {
      color: 'red'
    }
  }, error), _react["default"].createElement(Text, {
    type: "secondary"
  }, tips));
};

exports["default"] = _default;