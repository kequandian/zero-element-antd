"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NavMenuItem;

require("antd/lib/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

function NavMenuItem(_ref) {
  var data = _ref.data,
      onEdit = _ref.onEdit,
      onRemote = _ref.onRemote;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      edit = _useState2[0],
      setEdit = _useState2[1];

  var value = data.title || data.name;

  var _useState3 = (0, _react.useState)(value),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      v = _useState4[0],
      setV = _useState4[1];

  function handleEdit() {
    setEdit(true);
  }

  function cancelEdit() {
    setEdit(false);
    setV(value);
  }

  function handleInputChange(e) {
    var value = e.target.value;
    setV(value);
  }

  function handleSave() {
    onEdit(data.id, v);
    setEdit(false);
  }

  function handleRemote() {
    onRemote(data.id);
    setEdit(false);
  }

  return _react["default"].createElement("div", null, edit ? _react["default"].createElement(_tooltip["default"], {
    defaultVisible: true,
    title: _react["default"].createElement(_react["default"].Fragment, null, onEdit ? _react["default"].createElement(_icon["default"], {
      type: "save",
      onClick: handleSave
    }) : null, onRemote ? _react["default"].createElement(_icon["default"], {
      type: "delete",
      className: "ZEleA-margin-left",
      onClick: handleRemote
    }) : null, _react["default"].createElement(_icon["default"], {
      type: "rollback",
      className: "ZEleA-margin-left",
      onClick: cancelEdit
    }))
  }, _react["default"].createElement(_input["default"], {
    value: v,
    onChange: handleInputChange
  })) : _react["default"].createElement(_react["default"].Fragment, null, onEdit || onRemote ? _react["default"].createElement(_icon["default"], {
    type: "form",
    onClick: handleEdit
  }) : null, v));
}