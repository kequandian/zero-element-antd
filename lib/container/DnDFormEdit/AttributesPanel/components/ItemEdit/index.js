"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _Item = _interopRequireDefault(require("./Item"));

var _default = function _default(_ref) {
  var items = _ref.items,
      valueField = _ref.valueField,
      disabled = _ref.disabled,
      _ref$text = _ref.text,
      text = _ref$text === void 0 ? {} : _ref$text,
      onChange = _ref.onChange,
      onRemove = _ref.onRemove,
      onOptionsChange = _ref.onOptionsChange,
      onIndexChange = _ref.onIndexChange;

  var _useState = (0, _react.useState)(-1),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      editIndex = _useState2[0],
      setEditIndex = _useState2[1];

  function handleClick(i) {
    if (editIndex === i) {
      setEditIndex(-1);
    } else {
      setEditIndex(i);
    }
  }

  return items.map(function (item, i) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: i
    }, /*#__PURE__*/_react["default"].createElement(_Item["default"], (0, _extends2["default"])({}, item, {
      text: text,
      valueField: valueField,
      editId: editIndex,
      index: i,
      disabled: disabled,
      onClick: handleClick,
      onChange: onChange,
      onRemove: onRemove,
      onOptionsChange: onOptionsChange,
      onIndexChange: onIndexChange
    })), /*#__PURE__*/_react["default"].createElement("br", null));
  });
};

exports["default"] = _default;