"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/drawer/style/css");

var _drawer = _interopRequireDefault(require("antd/lib/drawer"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _FieldItem = _interopRequireDefault(require("./FieldItem"));

require("../../index.css");

var _default = function _default(_ref) {
  var visible = _ref.visible,
      onSwitchVisibel = _ref.onSwitchVisibel,
      onSaveFields = _ref.onSaveFields,
      _ref$fields = _ref.fields,
      fields = _ref$fields === void 0 ? [] : _ref$fields,
      checkedList = _ref.checkedList,
      onSwitchChecked = _ref.onSwitchChecked,
      onMoveField = _ref.onMoveField;
  var fieldItemProps = {
    checkedList: checkedList,
    onSwitchChecked: onSwitchChecked,
    onMoveField: onMoveField
  };
  return /*#__PURE__*/_react["default"].createElement(_drawer["default"], {
    title: "\u5217\u8868\u5B57\u6BB5\u7F16\u8F91",
    placement: "right",
    closable: false,
    onClose: onSwitchVisibel,
    visible: visible
  }, fields && fields.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_FieldItem["default"], (0, _extends2["default"])({
      data: item,
      key: item.field
    }, fieldItemProps));
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-ListFieldsEdit-divider"
  }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
    onClick: onSwitchVisibel
  }, "\u53D6\u6D88"), /*#__PURE__*/_react["default"].createElement(_button["default"], {
    type: "primary",
    onClick: onSaveFields
  }, "\u786E\u5B9A")));
};

exports["default"] = _default;