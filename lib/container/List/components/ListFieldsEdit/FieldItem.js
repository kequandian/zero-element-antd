"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _zeroLayout = require("zero-layout");

var _antd = require("antd");

require("../index.css");

var _this = void 0;

var FlexItem = _zeroLayout.Flex.FlexItem;

var _default = function _default(_ref) {
  var data = _ref.data,
      checkedList = _ref.checkedList,
      onSwitchChecked = _ref.onSwitchChecked;
  var checked = checkedList.findIndex(function (key) {
    return key === data.field;
  }) > -1;
  return _react["default"].createElement(_zeroLayout.Flex, {
    className: "ZEle-ListFieldsEdit-FieldItem"
  }, _react["default"].createElement(FlexItem, null, _react["default"].createElement(_antd.Checkbox, {
    checked: checked,
    onChange: onSwitchChecked.bind(_this, data)
  })), _react["default"].createElement(FlexItem, {
    flex: 1
  }, _react["default"].createElement("span", {
    className: "ZEle-ListFieldsEdit-FieldItem-label",
    onClick: onSwitchChecked.bind(_this, data)
  }, data.label)), _react["default"].createElement(FlexItem, null, _react["default"].createElement(_antd.Icon, {
    type: "arrow-up",
    className: "ZEle-ListFieldsEdit-FieldItem-icon"
  }), _react["default"].createElement(_antd.Icon, {
    type: "arrow-down",
    className: "ZEle-ListFieldsEdit-FieldItem-icon"
  })));
};

exports["default"] = _default;