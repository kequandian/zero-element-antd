"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ListFieldsEdit;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

var _DrawerContent = _interopRequireDefault(require("./DrawerContent"));

var _tool = require("../../../../utils/tool");

require("../../index.css");

function ListFieldsEdit(props) {
  var _props$fields = props.fields,
      fields = _props$fields === void 0 ? [] : _props$fields,
      handle = props.handle;
  var onFieldsOrder = handle.onFieldsOrder;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      visible = _useState2[0],
      setVisibel = _useState2[1];

  var _useState3 = (0, _react.useState)(fields.map(function (i) {
    return i.field;
  })),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      checkedList = _useState4[0],
      setCheckedList = _useState4[1];

  function onSwitchVisibel() {
    setVisibel(!visible);
  }

  function onSwitchChecked(data) {
    var field = data.field;
    var newCheckedList = (0, _toConsumableArray2["default"])(checkedList);
    var index = newCheckedList.findIndex(function (key) {
      return key === field;
    });

    if (index > -1) {
      newCheckedList.splice(index, 1);
    } else {
      newCheckedList.push(field);
    }

    setCheckedList(newCheckedList);
  }

  function onMoveField(type, data) {
    var field = data.field;
    var index = checkedList.findIndex(function (i) {
      return i === field;
    });
    (0, _tool.arrayItemMove)(checkedList, type, index);
    (0, _tool.arrayItemMove)(fields, type, index);
    setCheckedList((0, _toConsumableArray2["default"])(checkedList));
  }

  function onSaveFields() {
    onSwitchVisibel();
    onFieldsOrder(checkedList);
  }

  var drawerProps = {
    fields: fields,
    visible: visible,
    onSwitchVisibel: onSwitchVisibel,
    checkedList: checkedList,
    onSwitchChecked: onSwitchChecked,
    onMoveField: onMoveField,
    onSaveFields: onSaveFields
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
    className: "ZEleA-ListFieldsEdit-settingIcon",
    onClick: onSwitchVisibel
  }, /*#__PURE__*/_react["default"].createElement(_icons.SettingOutlined, {
    title: "\u7F16\u8F91\u5B57\u6BB5"
  })), /*#__PURE__*/_react["default"].createElement(_DrawerContent["default"], drawerProps));
}