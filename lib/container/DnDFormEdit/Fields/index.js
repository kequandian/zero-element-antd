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

  var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      inputData = _useState4[0],
      setInputData = _useState4[1];

  var editValue = (0, _react.useRef)([]);
  (0, _react.useEffect)(function (_) {
    if (editField === null) {
      editValue.current = JSON.parse(JSON.stringify(data));
    }
  }, [data, editField]);

  function handleAppend() {
    dispatch({
      type: 'appendField'
    });
  }

  function handleEdit(field) {
    setEditField(field);
    setInputData(editValue.current[field]);
  }

  function handleCancelEdit() {
    setEditField(null);
  }

  function handleValueChange(e) {
    var value = e.target.value;
    editValue.current[editField] = value;
    setInputData(value);
  }

  function handleSave() {
    dispatch({
      type: 'saveFields',
      payload: editValue.current
    });
    handleCancelEdit();
  }

  function handleRemove() {
    dispatch({
      type: 'removeFieldIndex',
      payload: {
        index: editField
      }
    });
    handleCancelEdit();
  }

  return /*#__PURE__*/_react["default"].createElement("div", null, editField !== null ? /*#__PURE__*/_react["default"].createElement(_layoutFlex.Flex, null, /*#__PURE__*/_react["default"].createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
    autoFocus: true,
    value: inputData,
    onChange: handleValueChange
  })), /*#__PURE__*/_react["default"].createElement(FlexItem, null, /*#__PURE__*/_react["default"].createElement(_button["default"], {
    className: "ZEleA-margin-left",
    type: "primary",
    onClick: handleSave
  }, "\u4FDD\u5B58"), /*#__PURE__*/_react["default"].createElement(_button["default"], {
    className: "ZEleA-margin-left",
    type: "danger",
    onClick: handleRemove
  }, "\u5220\u9664"), /*#__PURE__*/_react["default"].createElement(_button["default"], {
    className: "ZEleA-margin-left",
    onClick: handleCancelEdit
  }, "\u53D6\u6D88")), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null)) : null, data.map(function (field, i) {
    return /*#__PURE__*/_react["default"].createElement(_button["default"], {
      key: i,
      size: "small",
      className: "ZEleA-margin-left",
      onClick: handleEdit.bind(null, i)
    }, field);
  }), /*#__PURE__*/_react["default"].createElement(_button["default"], {
    type: "dashed",
    className: "ZEleA-margin-left",
    size: "small",
    icon: "plus",
    onClick: handleAppend
  }));
}