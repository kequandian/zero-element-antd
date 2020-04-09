"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

require("antd/lib/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

var _react = _interopRequireDefault(require("react"));

var _layoutFlex = require("layout-flex");

require("../../index.css");

var _this = void 0;

var FlexItem = _layoutFlex.Flex.FlexItem;

var _default = function _default(_ref) {
  var data = _ref.data,
      checkedList = _ref.checkedList,
      onSwitchChecked = _ref.onSwitchChecked,
      onMoveField = _ref.onMoveField;
  var checked = checkedList.findIndex(function (key) {
    return key === data.field;
  }) > -1;

  function onUp() {
    onMoveField('up', data);
  }

  function onDown() {
    onMoveField('down', data);
  }

  return _react["default"].createElement(_layoutFlex.Flex, {
    className: "ZEleA-ListFieldsEdit-FieldItem"
  }, _react["default"].createElement(FlexItem, null, _react["default"].createElement(_checkbox["default"], {
    checked: checked,
    onChange: onSwitchChecked.bind(_this, data)
  })), _react["default"].createElement(FlexItem, {
    flex: 1
  }, _react["default"].createElement("span", {
    className: "ZEleA-ListFieldsEdit-FieldItem-label",
    onClick: onSwitchChecked.bind(_this, data)
  }, data.label)), _react["default"].createElement(FlexItem, null, _react["default"].createElement(_icon["default"], {
    type: "arrow-up",
    className: "ZEleA-ListFieldsEdit-FieldItem-icon",
    onClick: onUp
  }), _react["default"].createElement(_icon["default"], {
    type: "arrow-down",
    className: "ZEleA-ListFieldsEdit-FieldItem-icon",
    onClick: onDown
  })));
};

exports["default"] = _default;