"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _DrawerContent = _interopRequireDefault(require("./DrawerContent"));

var _default = ListFieldsEdit = function ListFieldsEdit(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      visible = _useState2[0],
      setVisibel = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
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

  function onSaveFields() {
    onSwitchVisibel();
  }

  var drawerProps = {
    visible: visible,
    onSwitchVisibel: onSwitchVisibel,
    checkedList: checkedList,
    onSwitchChecked: onSwitchChecked,
    onSaveFields: onSaveFields
  };
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("span", {
    style: {
      paddingRight: '6px'
    },
    onClick: onSwitchVisibel
  }, _react["default"].createElement(_icon["default"], {
    type: "setting"
  })), _react["default"].createElement(_DrawerContent["default"], drawerProps));
};

exports["default"] = _default;