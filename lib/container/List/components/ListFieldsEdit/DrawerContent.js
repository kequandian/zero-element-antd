"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _FieldItem = _interopRequireDefault(require("./FieldItem"));

require("../index.css");

var _default = function _default(_ref) {
  var visible = _ref.visible,
      onSwitchVisibel = _ref.onSwitchVisibel,
      onSaveFields = _ref.onSaveFields,
      _ref$advancedConfig = _ref.advancedConfig,
      advancedConfig = _ref$advancedConfig === void 0 ? [] : _ref$advancedConfig,
      checkedList = _ref.checkedList,
      onSwitchChecked = _ref.onSwitchChecked;
  var fieldItemProps = {
    checkedList: checkedList,
    onSwitchChecked: onSwitchChecked
  };
  return _react["default"].createElement(_antd.Drawer, {
    title: "\u5217\u8868\u5B57\u6BB5\u7F16\u8F91",
    placement: "right",
    closable: false,
    onClose: onSwitchVisibel,
    visible: visible
  }, advancedConfig && advancedConfig.map(function (item) {
    return _react["default"].createElement(_FieldItem["default"], (0, _extends2["default"])({
      data: item,
      key: item.field
    }, fieldItemProps));
  }), _react["default"].createElement("div", {
    className: "ZEle-ListFieldsEdit-divider"
  }, _react["default"].createElement(_antd.Button, {
    onClick: onSwitchVisibel
  }, "\u53D6\u6D88"), _react["default"].createElement(_antd.Button, {
    type: "primary",
    onClick: onSaveFields
  }, "\u786E\u5B9A")));
};

exports["default"] = _default;