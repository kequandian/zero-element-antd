"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _layoutFlex = require("layout-flex");

var FlexItem = _layoutFlex.Flex.FlexItem;

function _default(_ref) {
  var data = _ref.data,
      dispatch = _ref.dispatch;

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      editField = _useState2[0],
      setEditField = _useState2[1];

  var editValue = (0, _react.useRef)('');

  function handleAppend() {
    dispatch({
      type: 'appendField'
    });
  }

  function handleEdit(field) {
    setEditField(field);
    editValue.current = field;
  }

  function handleCancelEdit() {
    setEditField(null);
  }

  function handleValueChange(e) {
    editValue.current = e.target.value;
  }

  function handleSave() {
    dispatch({
      type: 'changeField',
      payload: {
        field: editField,
        value: editValue.current
      }
    });
    handleCancelEdit();
  }

  function handleRemove() {
    dispatch({
      type: 'removeField',
      payload: {
        field: editField
      }
    });
    handleCancelEdit();
  }

  return _react["default"].createElement("div", null, editField ? _react["default"].createElement(_layoutFlex.Flex, null, _react["default"].createElement(FlexItem, {
    flex: 1
  }, _react["default"].createElement(_input["default"], {
    autoFocus: true,
    defaultValue: editField,
    onChange: handleValueChange
  })), _react["default"].createElement(FlexItem, null, _react["default"].createElement(_button["default"], {
    className: "ZEleA-margin-left",
    type: "primary",
    onClick: handleSave
  }, "\u4FDD\u5B58"), _react["default"].createElement(_button["default"], {
    className: "ZEleA-margin-left",
    type: "danger",
    onClick: handleRemove
  }, "\u5220\u9664"), _react["default"].createElement(_button["default"], {
    className: "ZEleA-margin-left",
    onClick: handleCancelEdit
  }, "\u53D6\u6D88")), _react["default"].createElement("br", null), _react["default"].createElement("br", null)) : null, data.map(function (field, i) {
    var isThisEdit = field === editField;
    var disabled = editField && !isThisEdit;
    return _react["default"].createElement(_button["default"], {
      key: i,
      size: "small",
      className: "ZEleA-margin-left",
      disabled: disabled,
      onClick: handleEdit.bind(null, field)
    }, field);
  }), _react["default"].createElement(_button["default"], {
    type: "dashed",
    className: "ZEleA-margin-left",
    size: "small",
    icon: "plus",
    disabled: editField,
    onClick: handleAppend
  }));
}