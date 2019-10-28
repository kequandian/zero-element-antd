"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = GlobalStyle;

require("antd/lib/modal/style/css");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

require("antd/lib/radio/style/css");

var _radio = _interopRequireDefault(require("antd/lib/radio"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

function GlobalStyle(_ref) {
  var layoutType = _ref.layoutType,
      dispatch = _ref.dispatch;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var layoutValue = (0, _react.useRef)('');

  function handleVisible() {
    setVisible(!visible);
  }

  function handleChange(e) {
    layoutValue.current = e.target.value;
  }

  function handleSave() {
    dispatch({
      type: 'save',
      payload: {
        layoutType: layoutValue.current
      }
    });
    handleVisible();
  }

  return _react["default"].createElement("div", null, _react["default"].createElement(_button["default"], {
    onClick: handleVisible
  }, "\u5168\u5C40\u6837\u5F0F"), _react["default"].createElement(_modal["default"], {
    destroyOnClose: true,
    visible: visible,
    onOk: handleSave,
    onCancel: handleVisible
  }, _react["default"].createElement(_radio["default"].Group, {
    defaultValue: layoutType,
    onChange: handleChange
  }, _react["default"].createElement(_radio["default"], {
    value: "horizontal"
  }, "horizontal"), _react["default"].createElement(_radio["default"], {
    value: "vertical"
  }, "vertical"))));
}